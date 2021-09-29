/*
 * @Author: LiCW
 * @Date: 2021-09-01 16:35:49
 * @LastEditTime: 2021-09-26 09:37:26
 * @LastEditors: LiCW
 * @Description: 侧边栏路由组件
 * @FilePath: \react-webpack-ts-project\src\components\layout\sidermenu\SiderMenu.tsx
 * @Moudle ../../../routes/RoutesMessage
 * @Moudle ./style/SiderMenu.css
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

/** 引入侧边栏导航路由信息 */
import RoutesMessage from '../../../routes/RoutesMessage'

require('./style/SiderMenu')

/** 引入参数类型定义 */
import { SiderMenu } from '../../ts/SiderMenu'

/** @type {Pick<Location, 'pathname'>} */
type routeLocation = Pick<Location, 'pathname'>

/**
 * @description: 侧边栏组件
 * @param {boolean} collapsed - 控制侧边栏收缩的变量
 * @return {JSX.Element}
 */

const siderMenu = (props:SiderMenu) => {
  const sidermenu: JSX.Element = (
    <>
    {RoutesMessage.map((item) => 
      <Menu.Item key={item.path} icon={<UserOutlined />}>
        <Link to={(item.path) }>
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    )}
    </>
  );
  /** 当前页面的url信息 */
  const RouteLocation: routeLocation = useLocation()
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed} className="sider">
      <div className="logo" />
      <Menu selectedKeys={[RouteLocation.pathname]} mode="inline">
        {sidermenu}
      </Menu>
    </Sider>
  )
}

export default siderMenu
