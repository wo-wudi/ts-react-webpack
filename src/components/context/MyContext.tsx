//引入react和antd相关
import React from 'react'
import { Switch, Route} from "react-router-dom";
import { Layout } from 'antd';

const { Content } = Layout;

//引入页面路由信息
import RoutesMessage from '../../routes/RoutesMessage'
//引入404错误页面
import NotFound from '../error/NotFound'

//路由匹配的内容区域
const myContext = () => {
  //内容区域
  const mycontext = (
    <>
      {RoutesMessage.map((item) =>  
        <Route exact path={item.path} key={item.path} component={item.component}/>
      )}
      {/* 匹配后台返回404，跳转到找不到资源页 */}
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
