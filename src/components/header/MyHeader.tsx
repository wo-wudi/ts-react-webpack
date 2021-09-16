//引入antd和react相关
import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;

//头部组件
const myHeader = (props:any) => {
  const closeSider = (
    React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick:() => props.closeShow(!props.collapsed)
    })
  )
  return (
    <Header className="site-layout-background" style={{ padding: 0 }} >
      {closeSider}
    </Header>
  )
}

export default myHeader

