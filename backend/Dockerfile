FROM node:alpine as build

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install 
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18-alpine

COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 4444

CMD [ "npm","run","start:prod" ]