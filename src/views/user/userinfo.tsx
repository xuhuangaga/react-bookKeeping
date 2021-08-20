import React, { useState, useEffect } from 'react'
import { NavBar, Icon, Button, Toast, Input } from 'zarm';
import GgUpload from '../../components/gg-upload/gg-upload';
import { useSelector,useDispatch } from 'react-redux'
import { editSignature } from '../../store/actions/user'
import { useWatch } from '../../hooks/useWatch'
import { useHistory } from 'react-router-dom'

interface Info {
  avatar: string,
  id: number,
  signature: string,
  username: string
}
const Userinfo = () => {
  let history = useHistory()
  let userData = useSelector((state: any) => state.user)
  let dispatch = useDispatch()
  let [user, setUser] = useState<Info>({
    avatar: '',
    id: 0,
    signature: '',
    username: ''
  })
  let headers = {
    Authorization: localStorage.getItem('token')
  }
  //上传头像请求成功
  let uploadSuccess = (res: any) => {
    Toast.show(res.msg)
    setUser({
      avatar: `http://api.chennick.wang${res.data}`,
      id: user.id,
      signature: user.signature,
      username: user.username
    })
  }
  //上传头像请求失败
  let uploadFail = (err: any) => {
    console.log(err)
  }
  useEffect(() => {
    setUser(JSON.parse((localStorage.getItem('user')!) as any))
  }, [])
  //修改个人资料
  const submit=()=>{
    dispatch(editSignature({ signature:user.signature, avatar:user.avatar }))
  }
   //监听
   useWatch(() => {
    if (userData.isSuccess)
      history.push('/my')
  }, [userData.isSuccess])
  return (
    <div>
      <div className={`b-b`}>
        <NavBar
          left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
          title="用户信息"
        />
      </div>
      <div className={`b-b p-10`}>
        <h2>个人资料</h2>
      </div>
      <div className={`p-10`}>
        <div className={`b-b`}>
          <div className={`m-t20`}>头像</div>
          <div className={`f-a-c m-t-b10 p-tb10`}>
            <img src={user.avatar} style={{ width: 60, height: 60 }} />
            <div className={`m-l10`}>
              <div className={`f-s12`}>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</div>
              <div className={`m-t10`}>
                <GgUpload
                  action='http://api.chennick.wang/api/upload'
                  headers={headers}
                  uploadSuccess={uploadSuccess}
                  uploadFail={uploadFail}
                >
                  <Button theme="primary" size="xs">点击上传</Button>
                </GgUpload>
              </div>
            </div>
          </div>
        </div>
        <div className={`b-b m-t20`}>
          <div className={`m-t-b10`}>个性签名</div>
          <div className={`f-s12 m-b20`}>
            <Input value={user.signature}
              clearable
              type="text"
              onChange={(value: any) => {
                setUser({
                  avatar: user.avatar,
                  id: user.id,
                  username: user.username,
                  signature: value
                });
              }} />
          </div>
        </div>
        <Button block theme="primary" style={{ margin: '60px 0px 0px 0px' }} onClick={submit}>保存</Button>
      </div>
    </div>
  )
}

export default Userinfo
