FROM node:20.9.0-slim
MAINTAINER xiaolong wang

VOLUME ["/project","/cache"]

ENV files="node_modules"
ENV manager="yarn"
ENV registry="https://registry.npmmirror.com/"
ENV command=""

WORKDIR /project

COPY ./bin .

ENTRYPOINT "./bin/install.sh" "-c" "/cache" "-f" "$files"  "-r" "$registry" "-m" "$manager" "-b" "$command"
