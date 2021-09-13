// 引入react及antd相关
import React from "react";
import { Layout } from 'antd';
import { HashRouter as Router } from "react-router-dom";
//引入侧边栏组件
import SiderMenu from '../components/sidermenu/SiderMenu'
//引入内容区域组件
import MyContext from "../components/context/MyContext";
//引入头部组件
import MyHeader from '../components/header/MyHeader'

//引入样式
require('./style/page.css')

//路由组件
const Page = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <SiderMenu></SiderMenu>
        <Layout className="site-layout">
          <MyHeader></MyHeader>
          <MyContext></MyContext>
        </Layout>
      </Router>
    </Layout>
  );
}
export default Page
