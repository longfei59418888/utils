


node_build(){
  VERSION=$1
  IMAGE_NAME=longfei59418/ci_build:node-20.10-slim-v$VERSION
  docker build -f ./node.dockerfile -t $IMAGE_NAME .
  docker push $IMAGE_NAME
  docker rmi $IMAGE_NAME
}
