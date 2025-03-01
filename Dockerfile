FROM node:20.18.2-alpine3.21

WORKDIR /home/app/backend

RUN apk add --no-cache curl

COPY package*.json .

RUN npm install

COPY .gitignore .
COPY README.md .
COPY public/ public/
COPY src/ src/
COPY Dockerfile Dockerfile

ENV PORT=
ENV MONGO_URL=
ENV CLOUD_NAME=
ENV API_KEY=
ENV API_SECRET=

EXPOSE 8000

CMD [ "npm", "start" ]