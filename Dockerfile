# Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn

COPY . .

# Accept build-time args
ARG VITE_API_URL
ARG VITE_API_EXPRESS
ARG VITE_MINIO_BUCKET

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_EXPRESS=$VITE_API_EXPRESS
ENV VITE_MINIO_BUCKET=$VITE_MINIO_BUCKET

# Build the app with Vite
RUN yarn build

EXPOSE 4173
CMD ["yarn", "preview"]
