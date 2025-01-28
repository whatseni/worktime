
# Node.js 이미지 선택
FROM node:18

# 작업 디텍터리 생성
RUN mkdir -p /wk_server

# 작업 디렉터리 설정
WORKDIR /wk_server

# 소스 복사
COPY ./wk_server/package.json /wk_server
COPY ./wk_server/tsconfig.json /wk_server
COPY ./wk_server/src /wk_server/src

# 패키지 설치
RUN npm install

# 컴파일
RUN npm run compile

# 앱 실행 포트 설정
EXPOSE 5000

# 앱 실행
CMD ["node", "dist/app.js"]