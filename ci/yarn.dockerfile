FROM node:20.9.0-slim
MAINTAINER xiaolong wang

VOLUME ["/project"]

WORKDIR /project

ENV command="build"

RUN yarn install

CMD nohup sh -c 'yarn install && yarn run $command'

