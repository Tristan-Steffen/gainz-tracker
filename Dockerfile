FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm i && npm run build

FROM node:alpine as deploy-node

WORKDIR /app

COPY --from=build /app/.next/standalone .
COPY --from=build /app/prisma ./prisma

RUN ls -la

EXPOSE 3000

CMD ["node", "server.js"]
