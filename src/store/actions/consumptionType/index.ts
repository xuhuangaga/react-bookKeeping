import api from "../../../http/api"
//消费类型列表
export const list = () => {
  return (dispatch: any) => {
    // 发请求
    api.consumptionType.list().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'tList',
        data: res.data.list
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}