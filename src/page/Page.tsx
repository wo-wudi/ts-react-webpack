// 引入react及antd相关
import React,{ useState } from "react";
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

//路由组件 antd的layout布局
const Page = () => {
  //控制侧边栏收缩的变量
  const [showSider,setShowSider] = useState<boolean>(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <SiderMenu collapsed={showSider}></SiderMenu>
        <Layout className="site-layout">
          <MyHeader closeShow={setShowSider} collapsed={showSider}></MyHeader>
          <MyContext></MyContext>
        </Layout>
      </Router>
    </Layout>
  );
}
export default Page
