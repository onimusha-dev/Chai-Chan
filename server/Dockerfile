FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5001

# CMD ["npm", "run", "dev"]

CMD pnpm run dev