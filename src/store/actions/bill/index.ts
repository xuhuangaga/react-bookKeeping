import api from "../../../http/api"
import { Toast } from "zarm"
import { BillObj, Obj } from "../../../types"
//账单列表
export const getList = ({ date, page, page_size, type_id }: { date: string, page: number, page_size: number, type_id: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.bill.list({ date, page, page_size, type_id }).then((res: any) => {
      if (res.data.list.length) {
        res.data.list.map((i: BillObj) => {
          i.totalIncome = 0
          i.totalExpenditure = 0
          i.bills && i.bills.map((item: Obj) => {
            item.pay_type === 2 ? 
            i.totalIncome += Number(item.amount) : 
            i.totalExpenditure += Number(item.amount)
          })
        })
      }
      // 触发reducer的方法
      dispatch({
        type: 'bList',
        data: res.data.list,
        totalExpense: res.data.totalExpense,
        totalIncome: res.data.totalIncome,
        totalPage: res.data.totalPage
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//添加账单
export const add = ({ amount, type_id, type_name, date, pay_type, remark }:
  { amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.bill.add({ amount, type_id, type_name, date, pay_type, remark }).then((res: any) => {
      res.code === 200 ? Toast.show('添加成功') : Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//账单详情
export const detail = ({ id }: { id: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.bill.detail({ id }).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'bDetail',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//编辑账单
export const update = ({ id, amount, type_id, type_name, date, pay_type, remark }:
  { id: string, amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.bill.update({ id, amount, type_id, type_name, date, pay_type, remark }).then((res: any) => {
      res.code === 200 ? Toast.show('修改成功') : Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//删除账单
export const bDel = ({ id }: { id: string }) => {
  return () => {
    // 发请求
    api.bill.delete({ id }).then((res: any) => {
      res.code===200?Toast.show('删除成功'):Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}