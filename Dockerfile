FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY . .

RUN yarn

RUN yarn build

# EXPOSE 3001

CMD ["yarn", "preview"]