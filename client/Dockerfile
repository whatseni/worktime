# React 앱 빌드 단계
FROM node:20 AS build
WORKDIR /client
COPY package.json yarn.lock .  
RUN yarn install --frozen-lockfile 

COPY . .
RUN yarn build

FROM nginx:alpine

COPY --from=build /client/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]