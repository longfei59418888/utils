


node_build(){
  VERSION=$1
  IMAGE_NAME=longfei59418/ci_build:node-20.10-slim-v$VERSION
  docker build -f ./node.dockerfile -t $IMAGE_NAME .
  docker push $IMAGE_NAME
  docker rmi $IMAGE_NAME
}

yarn_build(){
  VERSION=1
  IMAGE_NAME=longfei59418/ci_build:node-20.10-slim-yarn-v$VERSION
  docker build -f ./yarn.dockerfile -t $IMAGE_NAME .
#  docker push $IMAGE_NAME
#  docker rmi $IMAGE_NAME
}


android_build(){
  VERSION=$1
  IMAGE_NAME=longfei59418/ci_build:android-ci-v1.0
  docker build -f ./android.dockerfile -t $IMAGE_NAME .
}

android_build
