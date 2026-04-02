FROM node:20-slim AS builder

RUN npm install -g pnpm@9

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json tsconfig.json ./
COPY lib/ ./lib/
COPY artifacts/gab-digital/ ./artifacts/gab-digital/
COPY artifacts/api-server/ ./artifacts/api-server/

RUN pnpm install --no-frozen-lockfile

ENV NODE_ENV=production
ENV BASE_PATH=/
ENV PORT=3000

RUN pnpm --filter @workspace/gab-digital run build

RUN pnpm --filter @workspace/api-server run build

FROM node:20-slim

RUN npm install -g pnpm@9

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json tsconfig.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/package.json ./artifacts/api-server/package.json

RUN pnpm install --no-frozen-lockfile --prod

COPY --from=builder /app/artifacts/api-server/dist ./artifacts/api-server/dist
COPY --from=builder /app/artifacts/gab-digital/dist/public ./artifacts/gab-digital/dist/public

EXPOSE 3000

ENV PORT=3000
ENV STATIC_DIR=/app/artifacts/gab-digital/dist/public

CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
