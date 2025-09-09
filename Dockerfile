# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage - runtime environment variables
FROM node:22-alpine
WORKDIR /app

# Copy package.json and install only production dependencies + vite
COPY package*.json ./
RUN yarn install --production --frozen-lockfile && yarn add vite

# Copy source and built files
COPY --from=builder /app/dist ./dist
COPY . .

EXPOSE 4173
CMD ["yarn", "start"]