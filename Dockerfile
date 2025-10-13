# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build with placeholder environment variables
ENV VITE_API_URL=__VITE_API_URL__
ENV VITE_API_UPLOADING_SERVICE=__VITE_API_UPLOADING_SERVICE__
ENV VITE_MINIO_BUCKET=__VITE_MINIO_BUCKET__
ENV VITE_N8N_CHAT_WEBHOOK=__VITE_N8N_CHAT_WEBHOOK__

# Build the application
RUN yarn build

# Production stage - minimal image with runtime env injection
FROM node:22-alpine
WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist

# Copy and setup startup script
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 4173
CMD ["./start.sh"]