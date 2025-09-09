# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage - minimal image
FROM node:22-alpine
WORKDIR /app

# Install only serve for static file serving
RUN npm install -g serve

# Copy only the built files
COPY --from=builder /app/dist ./

EXPOSE 4173
CMD ["serve", "-s", ".", "-l", "4173"]