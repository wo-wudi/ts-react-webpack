/*
 * @Author: LiCW
 * @Date: 2021-08-26 11:08:20
 * @LastEditTime: 2021-09-18 14:27:47
 * @LastEditors: LiCW
 * @Description: 搭配路由的layout布局
 * @FilePath: \react-webpack-ts-project\src\page\Page.tsx
 * @module ../components/layout/sidermenu/SiderMenu
 * @module ../components/layout/context/MyContext
 * @module ../components/layout/header/MyHeader
 */

import React,{ useState } from "react";
import { Layout } from 'antd';
import { HashRouter as Router } from "react-router-dom";

/** 引入侧边栏，头部，内容区域组件 */
import SiderMenu from '../components/layout/sidermenu/SiderMenu'
import MyContext from "../components/layout/context/MyContext";
import MyHeader from '../components/layout/header/MyHeader'

/**
 * @description: 路由组件 antd的layout布局
 * @return {JSX.Element}
 */

const LayoutDemo = () => {
  /** 控制侧边栏收缩的变量 */
  const [showSider,setShowSider] = useState<boolean>(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <SiderMenu collapsed={showSider}></SiderMenu>
        <Layout>
          <MyHeader closeShow={setShowSider} collapsed={showSider}></MyHeader>
          <MyContext></MyContext>
        </Layout>
      </Router>
    </Layout>
  );
}
export default LayoutDemo
