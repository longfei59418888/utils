FROM node:20.10.0-slim
MAINTAINER xiaolong wang

VOLUME ["/project","/cache"]

WORKDIR /project

COPY ./bin/install.sh .

RUN corepack enable

ENTRYPOINT ["./bin/install.sh", "-c", "/cache"]
