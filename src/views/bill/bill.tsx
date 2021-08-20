import React, { useState, useEffect, useRef } from 'react'
import Tabbar from '../../components/tabbar/tabbar'
import Top from '../../components/bill/top/top'
import styles from '../../App.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { list } from '../../store/actions/consumptionType'
import { getList } from '../../store/actions/bill'
import Suspension from '../../components/bill/suspension/suspension'
import dayjs from 'dayjs'
import { Icon as icona, BillObj, Obj } from '../../types'
import { useHistory } from 'react-router-dom';
import { Pull, ActivityIndicator, Icon } from 'zarm'


const Bill = () => {
  let dispatch = useDispatch()
  let tData = useSelector((state: any) => state.consumptionType.tData)
  let history = useHistory()
  let data = useSelector((state: any) => state.bill.data)
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [activeKey, setActiveKey] = useState('bill')
  //总支出
  let expenditure = useSelector((state: any) => state.bill.totalExpense)
  //总收入
  let income = useSelector((state: any) => state.bill.totalIncome)
  //总页数
  let totalPage = useSelector((state: any) => state.bill.totalPage)
  let [date,setDate]=useState('')
  let [typeId,setTypeId]=useState('')
  const getData = (date: string, type_id: string) => {
    setTypeId(type_id)
    setDate(date)
    dispatch(getList({
      date: date,
      page: page,
      page_size: pageSize,
      type_id: type_id ? type_id.toString() : 'all'
    }))
  }
  //选择类型和日期
  const choice = (ids: number, times: string) => {
    getData(times, ids.toString())
  }
  const reffer = () => {
    getData(dayjs(new Date()).format('YYYY-MM'), "")
  }
  //页面加载
  useEffect(() => {
    getData(dayjs(new Date()).format('YYYY-MM'), "")
    dispatch(list())
  }, [])
  //跳转页面
  const goto = (id: number) => {
    history.push('/details', {
      id: id
    })
  }
  const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
  };

  const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
  };
  const [bodyScroll, setBodyScroll] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);

  const toggleScrollContainer = () => {
    const newBodyScroll = !bodyScroll;
    setBodyScroll(newBodyScroll);

    if (newBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };
  let mounted = true;
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    setTimeout(() => {
      if (!mounted) return;
      getData(date, typeId)
      setRefreshing(REFRESH_STATE.success);
    }, 2000);
  };
  const pullRef = useRef();
  const style = bodyScroll ? {} : { overflowY: 'auto' };
  return (
    <div className={`${styles.bdv}`}>

      <Top expenditure={expenditure} income={income} choice={choice} list={tData}></Top>
      <div className={`bc-e p-10  ${styles.content}`}>
        {
          !data.length ?
            <div className={`f-j-c ${styles.nodata}`}>
              <div>
                <img src="//s.yezgea02.com/1619144597039/empty.png" width="80" height="80" />
                <div className={`t-a-c f-c-6 m-t10`}>暂无数据</div>
              </div>
            </div>
            :
            <Pull ref={pullRef}
              style={style}
              refresh={{
                state: refreshing,
                handler: refreshData,
                render: (refreshState: any, percent: number | undefined) => {
                  const cls = `custom-control ${styles.refresh}`;
                  switch (refreshState) {
                    case REFRESH_STATE.pull:
                      return (
                        <div className={`${cls} f-a-c`}>
                          <ActivityIndicator loading={false} percent={percent} className={`${styles.ricf}`}/>
                          <span className={`f-s14 f-c-9`}>下拉刷新</span>
                        </div>
                      );

                    case REFRESH_STATE.drop:
                      return (
                        <div className={`${cls} f-a-c`}>
                          <ActivityIndicator loading={false} percent={100} className={`${styles.ricf}`} />
                          <span className={`f-s14 f-c-9`}>释放立即刷新</span>
                        </div>
                      );

                    case REFRESH_STATE.loading:
                      return (
                        <div className={`${cls} f-a-c`}>
                          <ActivityIndicator type="spinner" className={`${styles.ricf}`} />
                          <span className={`f-s14 f-c-9`}>加载中</span>
                        </div>
                      );

                    case REFRESH_STATE.success:
                      return (
                        <div className={`${cls} f-a-c`}>
                          <Icon type="right-round" theme="success" className={`${styles.ricf}`} />
                          <span className={`f-s14 f-c-9`}>加载成功</span>
                        </div>
                      );

                    case REFRESH_STATE.failure:
                      return (
                        <div className={`${cls} f-a-c`}>
                          <Icon type="wrong-round" theme="danger" className={`${styles.ricf}`} />
                          <span className={`f-s14 f-c-9`}>加载失败</span>
                        </div>
                      );

                    default:
                  }
                },
              }
              }>
              {
                data.map((item: BillObj, index: number) => {
                  return (
                    <div className={`br-10 m-b10 ${styles.dvitem}`} key={index}>
                      <div className={`f-j-b p-10 b-b br-10 ${styles.top}`}>
                        <div className={'f-w-b'}>
                          {item.date}
                        </div>
                        <div className={`f-a-c f-c-6 f-s12`}>
                          <div className={`${styles.types} yd f-c-w t-a-c f-s12`}>支</div>
                          <div className={`m-r20`}>￥{item.totalExpenditure}
                          </div>
                          <div className={`${styles.types} yd f-c-w t-a-c f-s12`}>收</div>
                          <div>￥{item.totalIncome}</div>
                        </div>
                      </div>
                      <div className={`bc-w f-c-6 ${styles.con}`}>
                        {
                          item.bills && item.bills.map((item1: Obj, index1: number) => {
                            return (
                              <div className={`p-10 b-b`} key={item1.id} onClick={() => goto(item1.id)}>
                                <div className={`f-j-b`}>
                                  <div className={`f-a-c`}>
                                    <div>
                                      <i className={`iconfont ${styles.icf} 
                                    ${icona.filter((i: any) => { return i.name === item1.type_name })[0].src}`
                                      }></i>
                                    </div>
                                    <div className={`${styles.name}`}>{item1.type_name}</div>
                                  </div>
                                  <div className={`${item1.pay_type === 2 ? styles.zc : styles.sr}`}>
                                    {item1.pay_type === 2 ? '+' : '-'}{item1.amount}
                                  </div>
                                </div>
                                <div className={`m-t20`}>{dayjs(Number(item1.date)).format('HH:mm')}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </Pull>
        }
      </div>
      <Suspension list={tData} reffer={reffer}></Suspension>
      <Tabbar activeKey={activeKey}></Tabbar>
    </div>
  )
}

export default Bill
