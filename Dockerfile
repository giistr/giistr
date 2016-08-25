FROM node:argon
MAINTAINER Alexandre Rieux <alexr.3165@gmail.com>

ARG wenv

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app
RUN npm install

ADD . /app
RUN npm install -g typescript
RUN npm install -g typings
RUN typings install
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "serve"]
