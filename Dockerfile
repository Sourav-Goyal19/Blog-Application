FROM node:20.18.2-alpine3.21

RUN apk add --no-cache curl

WORKDIR /home/app/backend

COPY package*.json .

RUN npm install

COPY .gitignore .
COPY README.md .
COPY public/ public/
COPY src/ src/
COPY Dockerfile Dockerfile

ENV PORT=8000
ENV MONGO_URL=mongodb+srv://goyalsourav935:6u6J7xzTN9462u4j@cluster0.7aibvdz.mongodb.net/
ENV CLOUD_NAME=dvovo1lfg
ENV API_KEY=984692373379189
ENV API_SECRET=UOQ9byFO87Q_6zOdxRyYKfwbJEk

EXPOSE 8000

CMD [ "npm", "start" ]