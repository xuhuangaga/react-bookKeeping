import api from "../../../http/api"
import { Toast } from 'zarm';

//注册
export const register = ({ username, password }: { username: string, password: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.user.register({ username, password }).then((res: any) => {
      Toast.show(res.msg)
      // 触发reducer的方法
      dispatch({
        type: 'register',
        isSuccess: res.code === 200 ? true : false
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//登录
export const login = ({ username, password }: { username: string, password: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.user.login({ username, password }).then((res: any) => {
      if (res.code === 200) {
        Toast.show(res.message)
        localStorage.setItem('token', res.data.token)
      } else Toast.show(res.msg)

      // 触发reducer的方法
      dispatch({
        type: 'login',
        data: res.data,
        isSuccess: res.code === 200 ? true : false
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取用户信息
export const userInfo = () => {
  return (dispatch: any) => {
    // 发请求
    api.user.getUserinfo().then((res: any) => {
      res.code === 200 ? localStorage.setItem('user', JSON.stringify(res.data)) : null
      // 触发reducer的方法
      dispatch({
        type: 'info',
        data: res.data,
        isSuccess:false
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//修改个性签名 头像
export const editSignature = ({ signature, avatar }: { signature: string, avatar: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.user.editSignature({ signature, avatar }).then((res: any) => {
      res.code===200?Toast.show('修改成功'):Toast.show(res.msg)
      dispatch({
        type: 'editsignature',
        isSuccess: res.code === 200 ? true : false
      })
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 修改用户密码
export const modifyPass = ({ old_pass, new_pass, new_pass2 }: { old_pass: string, new_pass: string, new_pass2: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.user.modifyPass({ old_pass, new_pass, new_pass2 }).then((res: any) => {
      res.code === 200 ? Toast.show('修改成功') : Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}