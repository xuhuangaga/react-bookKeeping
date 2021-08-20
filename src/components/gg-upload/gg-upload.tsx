import React from 'react'
import styles from './index.module.scss'
import { Toast } from 'zarm';

interface Props {
  children: React.ReactNode,
  // 单张图片最大尺寸 kb
  maxSize?: number,
  // 最多传多少张图片
  maxCount?: number,
  fileType?: string[],
  action: string,
  headers?: any,
  name?: string,
  uploadSuccess?: (res: any) => void,
  uploadFail?: (err: any) => void,
}

const GgUpload = (props: Props) => {
  let fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = (e.target as any).files
    if (Array.from(files).length > props.maxCount!) {
      Toast.show(`最多允许上传${props.maxCount!}张图片`)
      return
    }
    if (Array.from(files).some((item: any) => item.size > props.maxSize! * 1024)) {
      Toast.show(`图片允许上传的最大尺寸为${props.maxSize}kb`)
    }
    Array.from(files).map((item: any) => {
      if (!props.fileType!.includes(item.type.split('/')[1])) {
        Toast.show(`图片允许上传的格式为${props.fileType!.join(',')}`)
        return
      }
    })
    // 上传
    Array.from(files).map((item: any) => {
      let formData = new FormData()
      formData.append(props.name!, item)
      fetch(props.action, {
        method: 'POST',
        headers: props.headers,
        body: formData
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          props.uploadSuccess && props.uploadSuccess(res)
        }).catch((err: any) => {
          props.uploadFail && props.uploadFail(err)
        })
    })
  }

  return (
    <div>
      <div className={`${styles.wrap}`}>
        {props.children}
        <input className={`${styles.ipt}`} multiple type='file' onChange={(e) => fileChange(e)} />
      </div>
    </div>
  )
}


GgUpload.defaultProps = {
  maxSize: 200,
  maxCount: 9,
  fileType: ['jpg', 'png', 'jpeg'],
  name: 'file'
}

export default GgUpload
