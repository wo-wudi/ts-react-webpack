//导入reat，antd和路由相关
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
//引入侧边栏导航路由信息
import RoutesMessage from '../../routes/RoutesMessage'
//引入样式
require('./style/SiderMenu.css')
//定义RouteLocation类型
type routeLocation = Pick<Location, 'pathname'>

//侧边栏组件
const siderMenu = (props:any) => {
  //遍历路由信息生成侧边栏按钮
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
  //当前页面的url信息
  const RouteLocation: routeLocation = useLocation()
  //侧边栏
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
