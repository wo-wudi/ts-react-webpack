import React,{ useState } from 'react';
import { Layout } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;


const myHeader = () => {
  //控制侧边栏收缩的变量
  const [collApsed,setCollapsed] = useState<boolean>(false)
  return (
    <Header className="site-layout-background" style={{ padding: 0 }} >
      {/* {React.createElement(collApsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick:() => console.log(collApsed)
      })} */}
    </Header>
  )
}

export default myHeader

