/*
 * @Author: LiCW
 * @Date: 2021-09-01 16:47:55
 * @LastEditTime: 2021-09-18 14:34:48
 * @LastEditors: Please set LastEditors
 * @Description: 所有路由信息
 * @FilePath: \react-webpack-ts-project\src\routes\RoutesMessage.ts
 */

import Main from '../components/main/Main'
import Data from '../components/data/Data'

/** 定义路由信息的类型 */
type Routes = {
  path: string
  title: string
  component : () => JSX.Element
}

const RoutesMessage: Routes[]  = 
[
  { path: '/', title: 'antd-demo', component: Main},
  { path: '/myrwt/data', title: '用户管理', component: Data},
]

export default RoutesMessage;
