export interface Type {
  id: number,
  name: string,
  type: string,
  icon: string
}

export interface Obj {
  amount: string,
  date: string,
  id: number,
  pay_type: number,
  remark: string,
  type_id: number,
  type_name: string
}
export interface BillObj {
  date: string,
  bills: Obj[],
  totalExpenditure: number,
  totalIncome: number
}
export const Icon = [
  {
    src: 'icon-canyin',
    name: '餐饮'
  },
  {
    src: 'icon-fushi',
    name: '服饰'
  },
  {
    src: 'icon-jiaotong-01',
    name: '交通'
  },
  {
    src: 'icon-riyongpin',
    name: '日用'
  },
  {
    src: 'icon-gouwu',
    name: '购物'
  },
  {
    src: 'icon-xuexi',
    name: '学习'
  },
  {
    src: 'icon-yiliao',
    name: '医疗'
  },
  {
    src: 'icon-lvhang',
    name: '旅行'
  },
  {
    src: 'icon-ren',
    name: '人情'
  },
  {
    src: 'icon-qita',
    name: '其他'
  },
  {
    src: 'icon-gongzi',
    name: '工资'
  },
  {
    src: 'icon-jiangjinguize',
    name: '奖金'
  }, {
    src: 'icon-zhuanzhang',
    name: '转账'
  }, {
    src: 'icon-licai',
    name: '理财'
  }, {
    src: 'icon-tuikuan',
    name: '退款'
  }, {
    src: 'icon-qita',
    name: '其他'
  }
]