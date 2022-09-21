FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm i && npx prisma generate && npm run build

FROM node:alpine as deploy-node

WORKDIR /app

RUN rm -rf ./*

COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/.next .
COPY --from=build /app/prisma .

RUN npm ci -P && npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
