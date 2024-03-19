#!/usr/bin/env node

// import * as path from 'path'
import * as yargs from 'yargs'
// import * as ci from 'miniprogram-ci'

// const setting = ({
//   privateKeyPath,
//   appVersion,
//   appDesc,
//   robot,
//   projectConfigPath,
// }) => {
//   console.table({ privateKeyPath, appVersion, appDesc, robot })
//   const project = new ci.Project({
//     projectPath: path.resolve(projectConfig.miniprogramRoot),
//     privateKeyPath,
//     appid: projectConfig.appid,
//     type: projectConfig.compileType,
//   })
//
//   return {
//     project,
//     version: appVersion,
//     desc: appDesc,
//     robot,
//     setting: {
//       es6: false,
//       minifyJS: false,
//       minifyWXSS: false,
//       minifyWXML: true,
//       codeProtect: true,
//     },
//     onProgressUpdate() {},
//   }
// }

const run = (argv: any) => {
  console.log(argv)
}
// executor(setting(argv))
//   .then(({ subPackageInfo }) =>
//     console.table(
//       subPackageInfo.map((i) => ({ ...i, size: formatBytes(i.size) })),
//     ),
//   )
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })

yargs
  .scriptName('weapp-ci')
  .usage('$0 <cmd> [args]')
  .command('upload', '上传小程序', {}, run)
  .command('preview', '预览小程序', {}, run)
  .option('private-key', { describe: '小程序私钥' })
  .option('private-key-path', { describe: '小程序私钥路径' })
  .option('project-config-path', { describe: '小程序私钥路径' })
  .option('app-version', {
    describe: '小程序上传版本号',
    default: `{projectname}.{env}`,
  })
  .option('app-desc', {
    describe: '小程序上传备注信息',
    default: `{projectname} on {env}`,
  })
  .option('robot', {
    type: 'number',
    describe: '指定使用哪一个 ci 机器人，可选值：1 ~ 30',
    default: 1,
  })
  .check((argv) => {
    if (argv['privateKey'] || argv['privateKeyPath']) return true
    throw new Error(
      '缺失必要参数，至少填写其中一项: private-key, private-key-path',
    )
  })
  .help('h').argv
