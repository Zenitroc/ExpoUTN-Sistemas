FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY scripts/expo-server.mjs ./scripts/expo-server.mjs
EXPOSE 4173
CMD ["node", "scripts/expo-server.mjs", "--port", "4173", "--root", "dist", "--config", "/config/settings.json"]
