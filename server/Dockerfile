FROM node:20

WORKDIR /server

COPY . .

RUN npm install

RUN npm run compile

CMD ["node", "dist/app.js"]

EXPOSE 5000