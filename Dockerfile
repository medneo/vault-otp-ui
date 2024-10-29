FROM node:23.1-alpine3.19

RUN     mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app

COPY --chown=node:node ["package*.json","/home/node/app/"]

USER node

WORKDIR /home/node/app

RUN  npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.mjs" ]