FROM node:alpine

RUN mkdir -p /usr/src/investment-app && chown -R node:node /usr/src/investment-app

WORKDIR /usr/src/investment-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000