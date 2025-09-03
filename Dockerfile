FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json yarn.lock ./
RUN yarn

# Copy all source
COPY . .

# Build the project
RUN yarn build

# Expose port
EXPOSE 4173

# Start the app
CMD ["yarn", "preview"]