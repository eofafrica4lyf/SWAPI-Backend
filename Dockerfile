FROM node:12.17.0
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet && npm i -g nodemon
ADD . .