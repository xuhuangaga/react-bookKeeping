import React, { useState, useEffect,useRef } from 'react'
import * as echarts from 'echarts'

interface Props {
  arr: any,
  totalMoney: number
}

const Shape = (props: Props) => {
  let ech = useRef(null)
  let option = {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const getData = () => {
    option.series[0].data=[]
    if (props.arr) {
      props.arr.map((item: any) => {
        option.series[0].data.push({ name: item.type_name, value: ((item.number / props.totalMoney) * 100).toFixed(2) } as never)
      })
      var myChart = echarts.init(ech.current!);
      myChart.setOption(option)
    }
  }
  //页面加载
  useEffect(() => {
    getData()
  }, [props.arr])
  return (
    <div className={`f-j-c`}>
      <div id="main" ref={ech} style={{ width: 350, height: 350}}></div>
    </div>
  )
}
export default Shape
