# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production=false
COPY --from=builder /app/dist ./dist
COPY . .
EXPOSE 4173
CMD ["yarn", "start"]