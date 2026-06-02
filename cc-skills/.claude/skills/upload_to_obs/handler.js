const ObsClient = require('esdk-obs-nodejs')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const AK = ''
const SK = ''
const SERVER = ''
const BUCKET = ''
const PUBLIC_URL = ''

function uuid() {
  return crypto.randomBytes(16).toString('hex')
}

exports.handler = async ({ file_path }) => {
  // 验证输入参数
  if (!file_path) {
    throw new Error('file_path is required')
  }

  // 验证文件是否存在
  if (!fs.existsSync(file_path)) {
    throw new Error(`File not found: ${file_path}`)
  }

  // 验证是否为文件
  const stat = fs.statSync(file_path)
  if (!stat.isFile()) {
    throw new Error(`Path is not a file: ${file_path}`)
  }

  const ext = path.extname(file_path)

  const objectKey = `glep-web-lang-edu/lang-edu/images/fg-folder/${uuid()}${ext}`

  const obsClient = new ObsClient({
    access_key_id: AK,
    secret_access_key: SK,
    server: SERVER,
  })

  try {
    await new Promise((resolve, reject) => {
      obsClient.putObject(
        {
          Bucket: BUCKET,
          Key: objectKey,
          SourceFile: file_path,
        },
        (err, result) => {
          if (err) {
            return reject(err)
          }
          if (result.CommonMsg.Status < 300) {
            resolve()
          } else {
            reject(
              new Error(
                `OBS upload failed: ${result.CommonMsg.Code} - ${result.CommonMsg.Message}`,
              ),
            )
          }
        },
      )
    })

    // 上传成功后删除本地文件
    try {
      fs.unlinkSync(file_path)
    } catch (deleteErr) {
      console.warn(`Failed to delete local file: ${deleteErr.message}`)
    }

    const url = `${PUBLIC_URL}/${objectKey}`
    return { url }
  } finally {
    obsClient.close()
  }
}
