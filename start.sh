#!/bin/sh

# Replace placeholders with actual environment variables in built files
echo "Injecting runtime environment variables..."

find /app/dist -name "*.js" -type f -exec sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" {} \;
find /app/dist -name "*.js" -type f -exec sed -i "s|__VITE_API_UPLOADING_SERVICE__|${VITE_API_UPLOADING_SERVICE:-}|g" {} \;
find /app/dist -name "*.js" -type f -exec sed -i "s|__VITE_MINIO_BUCKET__|${VITE_MINIO_BUCKET:-}|g" {} \;

echo "Environment variables injected successfully"
echo "Starting server on port 4173..."

# Start the server
exec serve -s dist -l 4173 --single
