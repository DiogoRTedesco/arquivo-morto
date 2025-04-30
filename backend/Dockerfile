FROM node:alpine as build

WORKDIR /usr/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install
RUN npx prisma generate


COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/app


RUN apk add --no-cache openssl postgresql-client
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma
COPY --from=build /usr/app/tsconfig.json ./tsconfig.json
COPY entrypoint.sh /usr/app/entrypoint.sh
RUN chmod +x /usr/app/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 4444


CMD ["sh", "/usr/app/entrypoint.sh"]
