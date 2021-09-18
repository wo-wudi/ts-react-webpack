/*
 * @Author: LiCW
 * @Date: 2021-09-03 09:57:54
 * @LastEditTime: 2021-09-18 11:53:03
 * @LastEditors: LiCW
 * @Description: 头部组件
 * @FilePath: \react-webpack-ts-project\src\components\layout\header\MyHeader.tsx
 * @module ./style/MyHeader.css
 * @Module ../../ts/MyHeader
 */

import React from 'react';
import { Layout, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;

/** 引入参数类型定义*/
import { MyHeader } from '../../ts/MyHeader'

require('./style/MyHeader.css')

/**
 * @description: 头部组件
 * @param {boolean} collapsed - 控制侧边栏收缩的变量
 * @param {React.Dispatch<React.SetStateAction<boolean>>} closeShow - 改变侧边栏收缩的变量的方法
 * @return {JSX.Element}
 */

const myHeader = (props:MyHeader) => {
  const closeSider = (
    React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick:() => props.closeShow(!props.collapsed)
    })
  )
  return (
    <Header className="site-layout-background">
      {closeSider}
      <Avatar  
        className="avatar"
        size="large"
        style={{
          backgroundColor: '#1890ff',
        }}
        icon={<UserOutlined />}
       />
    </Header>
  )
}

export default myHeader

