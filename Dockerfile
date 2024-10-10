FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

FROM node:22-alpine AS production

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=build /app/build ./build

COPY --from=build /app/public ./public

ENV PORT=3000

EXPOSE $PORT

HEALTHCHECK CMD "curl --fail http://localhost:$PORT/ || exit 1" \
    --interval=30s \
    --timeout=30s \
    --start-period=30s \
    --retries=3 

CMD ["npm", "run", "deploy-linux"]