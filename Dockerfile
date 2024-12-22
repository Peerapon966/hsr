FROM node:18-alpine3.17 AS base

FROM base AS deps
USER root
RUN apk add --no-cache libc6-compat python3 py3-pip make g++ libssl1.1 libc6-compat zlib jq
WORKDIR /app

COPY package*.json .
RUN npm ci
RUN npm rebuild argon2 --build-from-source

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN cat .dockerignore
RUN ls -la

RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir logs && \
    chmod 777 logs && \
    touch logs/nextjs.log && \
    chmod 777 logs/nextjs.log
    
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN --mount=type=secret,id=REDIS_URL \
  sed -i "s|REDIS_URL=|REDIS_URL=$(cat /run/secrets/REDIS_URL)|g" .env.production
RUN --mount=type=secret,id=DATABASE_URL \
  sed -i "s|DATABASE_URL=|DATABASE_URL=$(cat /run/secrets/DATABASE_URL)|g" .env.production
RUN --mount=type=secret,id=NEXTAUTH_SECRET \
  sed -i "s|NEXTAUTH_SECRET=|NEXTAUTH_SECRET=$(cat /run/secrets/NEXTAUTH_SECRET)|g" .env.production
RUN --mount=type=secret,id=GOOGLE_CLIENT_ID \
  sed -i "s|GOOGLE_CLIENT_ID=|GOOGLE_CLIENT_ID=$(cat /run/secrets/GOOGLE_CLIENT_ID)|g" .env.production
RUN --mount=type=secret,id=GOOGLE_CLIENT_SECRET \
  sed -i "s|GOOGLE_CLIENT_SECRET=|GOOGLE_CLIENT_SECRET=$(cat /run/secrets/GOOGLE_CLIENT_SECRET)|g" .env.production

USER nextjs

EXPOSE 3000

ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]