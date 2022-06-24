FROM node:18.4-alpine3.15 AS builder
WORKDIR "/app"
COPY . .
RUN rm -rf node_modules
RUN yarn install
RUN yarn build
FROM node:18.4-alpine3.15 AS production
WORKDIR "/app"

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/orm.config.ts ./src/orm.config.ts
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/tsconfig.json ./tsconfig.json
CMD [ "sh", "-c", "yarn run db:migrate && yarn run start:prod"]