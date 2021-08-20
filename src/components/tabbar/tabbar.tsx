import React, { useState } from 'react'
import { Icon, TabBar} from 'zarm';
const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747835_7taaaik4yne.js');
import { useWatch } from '../../hooks/useWatch/'
import { useHistory } from 'react-router-dom'

interface Props {
  activeKey:string
}
const Tabbar = (props: Props) => {
  let [activeKey, setActiveKey] = useState(props.activeKey)
  let history = useHistory()
  //监听
  useWatch(() => {
    history.push(activeKey === 'bill' ? '/' : '/' + activeKey)
  }, activeKey)

  return (
    <div>
      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        <TabBar.Item itemKey="bill" title="账单" icon={<TabIcon type="icon-zhangdan" />} />
        <TabBar.Item
          itemKey="statistics"
          title="统计"
          icon={<TabIcon type="icon-tongji" />}
        />
        <TabBar.Item
          itemKey="my"
          title="我的"
          icon={<TabIcon type="icon-wode" />}
        />
      </TabBar>
    </div>
  )
}

export default Tabbar
