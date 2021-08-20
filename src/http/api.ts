import http from "./"

export default {
  //用户接口
  user: {
    //注册
    register({ username, password }: { username: string, password: string }) {
      return http.post('/api/user/register', { username, password })
    },
    //登录
    login({ username, password }: { username: string, password: string }) {
      return http.post('/api/user/login', { username, password })
    },
    //获取用户信息
    getUserinfo() {
      return http.get('/api/user/get_userinfo')
    },
    //修改个性签名 头像
    editSignature({ signature, avatar }: { signature: string, avatar: string }) {
      return http.post('/api/user/edit_userinfo', { signature, avatar })
    },
    //修改用户密码
    modifyPass({ old_pass, new_pass, new_pass2 }: { old_pass: string, new_pass: string, new_pass2: string }) {
      return http.post('/api/user/modify_pass', {
        old_pass, new_pass, new_pass2
      })
    }
  },
  //消费类型接口
  consumptionType: {
    //消费类型列表
    list() {
      return http.get('/api/type/list')
    }
  },
  //账单接口
  bill: {
    // 账单列表
    list({ date, page, page_size, type_id }: { date: string, page: number, page_size: number, type_id: string }) {
      return http.get(`/api/bill/list?date=${date}&page=${page}&page_size=${page_size}&type_id=${type_id}`)
    },
    //添加账单
    add({ amount, type_id, type_name, date, pay_type, remark }:
      { amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark: string }) {
      return http.post('/api/bill/add', { amount, type_id, type_name, date, pay_type, remark })
    },
    //账单详情
    detail({ id }: { id: string }) {
      return http.get(`/api/bill/detail?id=${id}`)
    },
    //编辑账单
    update({ id, amount, type_id, type_name, date, pay_type, remark }:
      { id: string, amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark: string }) {
      return http.post('/api/bill/update', { id, amount, type_id, type_name, date, pay_type, remark })
    },
    //删除账单
    delete({id}:{id:string}) {
      return http.post('/api/bill/delete',{id})
    }
  },
  //统计接口
  statistics:{
    //数据统计
    data({date}:{date:string}){
      return http.get(`/api/bill/data?date=${date}`)
    }
  }
}