FROM node:latest
WORKDIR /app

COPY package*.json /app

RUN npm install -y
EXPOSE 3000
COPY . .

CMD [ "npm", "start" ]