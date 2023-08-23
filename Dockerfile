FROM node:18 as base

WORKDIR /mark-hotel
COPY package.json .
RUN npm install

COPY . .
RUN npx prisma generate

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build