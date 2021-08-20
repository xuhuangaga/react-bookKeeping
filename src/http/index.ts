import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Toast } from 'zarm'
import { useHistory } from 'react-router-dom'

const http = axios.create({
  timeout: 1000,
  baseURL: 'http://api.chennick.wang'
})

//请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err: AxiosError) => {
  return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use((res: any) => {
  return res.data
}, (err: AxiosError) => {
  let status: number = err.response! && err.response!.status
  switch (status) {
    case 400:
      Toast.show('参数错误')
      break;
    case 401:
      useHistory().push('/login')
      Toast.show('登录时间过长,请重新登录')
      break;
    case 403:
      Toast.show('没有权限')
      break
    case 404:
      Toast.show('路径错误')
      break
    case 500:
      Toast.show('服务器错误')
      break
    case 503:
      Toast.show('服务器维护')
      break;
  }
  return Promise.reject(err)
})


export default http