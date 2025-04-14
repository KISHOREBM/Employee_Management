FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=5173

EXPOSE 5173

CMD [ "npm","run","dev" ]