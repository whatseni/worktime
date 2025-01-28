# 1. Node.js 이미지로 빌드 단계 실행
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 2. Nginx로 배포 단계 실행
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사 (선택 사항, 기본값으로도 가능)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너가 80번 포트를 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
