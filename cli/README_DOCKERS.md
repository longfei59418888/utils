## DOCKER IMAGE

docker image 介绍

### longfei59418/ci_build

###### 用于安装依赖包，显示了依赖缓存，自动构建
###### https://hub.docker.com/repository/docker/longfei59418/ci_build/general

```shell
docker run --rm  -v $PWD:/project -v /home/.npm_cache/{PROJECT_NAME}:/cache -e files="node_modules,src" -e command="yarn run build;yarn run test"  longfei59418/ci_build:node-20.10-slim-v1
```

#### 执行上面的命令发生什么:

- 第1步：检查 /home/.npm_cache/{PROJECT_NAME} 目录下是否存在 package.json，如果不存在直接执行 install ，执行第3步，如果存在，执行第2步 -
- 第2步：对比 /home/.npm_cache/{PROJECT_NAME}/package.json 和 $PWD/ package.json 是否相同，如果不相同，执行第3步，如果相同，执行第4步
- 第3步：安装依赖包，然后缓存 files 参数中的目录到 /home/.npm_cache/{PROJECT_NAME}/ 下
- 第4步：将 /home/.npm_cache/{PROJECT_NAME}/ 下缓存 files 参数中的目录复制到 $PWD 下
- 第5步: 执行 command 参数到命令进行构建

#### 参数

- {dirPath}:/cache
  - dirPath: 缓存的宿主机目录。 eg: /home/.npm_cache/{PROJECT_NAME}
- {$PWD}:/project 
  - $PWD: 项目目录
- files：需要缓存的文件或者文件夹项目目录的相对路径，多个以","隔开，默认 node_modules。eg: node_modules,.yarn
- command: 需要执行的脚本，多个以";"隔开。eg: yarn run build;yarn run test
- manager: 包管理器，默认 yarn。
- registry: npm/yarn 源，默认 https://registry.npmmirror.com/。
