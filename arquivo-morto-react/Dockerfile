FROM node:alpine as build

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine


WORKDIR /usr/app

COPY --from=build /usr/app/dist .

RUN npm install -g serve

EXPOSE 3001
CMD ["serve", "-s", ".", "-l", "3001"]









