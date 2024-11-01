FROM node:23.1-alpine3.19 as base

RUN     mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app

COPY --chown=node:node ["package*.json","/home/node/app/"]

USER node

WORKDIR /home/node/app

COPY --chown=node:node . .

FROM base as prod

ENV NODE_ENV prod

RUN  npm install --omit=dev

EXPOSE 8080

CMD [ "node", "index.mjs" ]

FROM base as test

ENV NODE_ENV test

RUN npm install --include-dev

RUN npm test
