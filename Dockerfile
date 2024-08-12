FROM node:18-alpine

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma
COPY .env ./.env

RUN npm ci

COPY next.config.*js .
COPY tsconfig.json .

EXPOSE 3000

CMD npm run dev