/*
 * @Author: LiCW
 * @Date: 2021-09-02 11:52:29
 * @LastEditTime: 2021-09-18 11:53:32
 * @LastEditors: LiCW
 * @Description: 内容区域组件
 * @FilePath: \react-webpack-ts-project\src\components\context\MyContext.tsx
 */

import React from 'react'
import { Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
const { Content } = Layout;

/** 引入页面路由信息*/
import RoutesMessage from '../../../routes/RoutesMessage'
import NotFound from '../../error/NotFound'

/**
 * @description: 路由匹配内容区域组件
 * @return {JSX.Element}
 */

const myContext = () => {
  const mycontext = (
    <>
      {RoutesMessage.map((item) =>  
        <Route exact path={item.path} key={item.path} component={item.component}/>
      )}
      <Route path="/404" component={NotFound}></Route>
    </>
  );
  return (
    <Content style={{ margin: '0 16px'}}>
      <Switch>
        {mycontext}
      </Switch>
    </Content>
  )
}

export default myContext
