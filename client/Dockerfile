# React 앱 빌드 단계
FROM node:20 AS build
WORKDIR /client
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build

# Nginx로 배포 단계
FROM nginx:alpine
COPY --from=build /client/build /usr/share/nginx/client
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]