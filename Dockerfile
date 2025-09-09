# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_URL
ARG VITE_API_UPLOADING_SERVICE
ARG VITE_MINIO_BUCKET

# Convert build args to environment variables for the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_UPLOADING_SERVICE=$VITE_API_UPLOADING_SERVICE
ENV VITE_MINIO_BUCKET=$VITE_MINIO_BUCKET

# Build the application
RUN yarn build

# Production stage - minimal image
FROM node:22-alpine
WORKDIR /app

# Install only serve for static file serving
RUN npm install -g serve

# Copy only the built files
COPY --from=builder /app/dist ./

EXPOSE 4173
CMD ["serve", "-s", ".", "-l", "4173", "--single"]