import api from "../../../http/api"
//数据统计
export const getStatistics = ({date}:{date:string}) => {
  return (dispatch: any) => {
    // 发请求
    api.statistics.data({date}).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type:'statistics',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}