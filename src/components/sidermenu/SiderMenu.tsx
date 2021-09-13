//导入reat，antd和路由相关
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';

//引入侧边栏导航路由信息
import RoutesMessage from '../../routes/RoutesMessage'

const { Sider } = Layout;

//引入样式
require('./style/SiderMenu.css')

const siderMenu = () => {
  //侧边栏导航
  const sidermenu = (
    <>
    {RoutesMessage.map((item) => 
      <Menu.Item key={item.path}>
        <Link to={(item.path) }>
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    )}
    </>
  );
  //当前页面的url信息
  const RouteLocation = useLocation()
  //侧边栏
  return (
    <Sider className="sider">
      <div className="logo" />
      <Menu selectedKeys={[RouteLocation.pathname]}  mode="inline">
        {sidermenu}
      </Menu>
    </Sider>
  )
}

export default siderMenu
