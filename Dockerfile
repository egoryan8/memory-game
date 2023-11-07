ARG NODE_VERSION=16
ARG server_port
ARG postgres_port
ARG postgres_host
ARG postgres_user
ARG postgres_password

FROM node:$NODE_VERSION-buster as base
ENV SERVER_PORT=$server_port
ENV POSTGRES_PORT=$postgres_port
ENV POSTGRES_HOST=$postgres_host
ENV POSTGRES_USER=$postgres_user
ENV POSTGRES_PASSWORD=$postgres_password

WORKDIR /app

FROM base AS dependencies

COPY package.json yarn.lock lerna.json init.js .env.sample ./
COPY ./packages/client/. /app/packages/client/
COPY ./packages/server/. /app/packages/server/

RUN yarn install --frozen-lockfile
RUN rm -rf /app/packages/client/dist/ && yarn build --scope=client
RUN rm -rf /app/packages/client/ssr-dist/ && yarn build:ssr --scope=client

FROM dependencies as build

RUN yarn lerna bootstrap
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server


FROM base as production
WORKDIR /app

COPY --from=build /app/packages/server/dist/ /app/server/
COPY --from=build /app/packages/server/package.json /app/server/package.json
COPY --from=build /app/packages/client/ssr-dist/ /app/client/ssr-dist/
COPY --from=build /app/packages/client/dist/ /app/client/dist/
RUN cd ./server && yarn install --production=true

EXPOSE $SERVER_PORT
CMD [ "node", "/app/server/index.js" ]
