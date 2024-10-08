#!/usr/bin/env bash

GIT_PROJECT_NAME=$(basename $(git rev-parse --show-toplevel))
GIT_COMMIT=$(git log -n 1 --pretty=format:'%h')

FILES=node_modules
CACHE=/home/node_modules_cache/$GIT_PROJECT_NAME
MANAGER=yarn
CMD=$(pwd)

while getopts ":f:c:m:" opt
do
    case $opt in
        f)
        FILES=$OPTARG
        ;;
        c)
        CACHE=$OPTARG
        ;;
        m)
        MANAGER=$OPTARG
　　　　 ;;
        ?)
esac done

CACHE_PACKAGE_JSON=$CACHE/package.json
CMD_PACKAGE_JSON=$CMD/package.json


cache_push(){
    mkdir -p $CACHE
    FILES=$FILES,package.json
    for file in $(echo ${FILES} | awk '{split($0,arr,",");for(i in arr) print arr[i]}')
    do
    sourceFile=$CMD/$file
    targetFile=$CACHE/$file
    if [ ! -d sourceFile ];then
      cp -Rf $sourceFile $targetFile
      else
      mkdir -p $targetFile
      cp -Rf $sourceFile/* $targetFile/*
    fi
    done
}

cache_pop(){
    for file in $(echo ${FILES} | awk '{split($0,arr,",");for(i in arr) print arr[i]}')
    do
    sourceFile=$CACHE/$file
    targetFile=$CMD/$file
    if [ -e sourceFile ];then
      rm -Rf $targetFile
    fi
    if [ ! -d sourceFile ];then
      cp -Rf $sourceFile $targetFile
      else
      cp -Rf $sourceFile/* $targetFile/*
    fi
    done
}

if [ ! -f $CACHE_PACKAGE_JSON ];then
  echo $CACHE_PACKAGE_JSON no exsit
  $MANAGER install
  cache_push
  else
  diff=$(diff $CACHE_PACKAGE_JSON $CMD_PACKAGE_JSON)
  if [ -z $diff ]; then
      echo use cache from $CACHE
      cache_pop
  else
     echo $CMD_PACKAGE_JSON change
     $MANAGER install
     rm  -rf $CACHE
     cache_push
  fi
fi



