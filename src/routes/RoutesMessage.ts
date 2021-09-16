//引入所有路由对应的页面
import Main from '../components/main/Main'
import Data from '../components/data/Data'
//定义路由信息的类型
type Routes = {
  path: string
  title: string
  component : () => JSX.Element
}
// 所有路由信息
const RoutesMessage: Routes[]  = 
[
  { path: '/', title: 'antd-demo', component: Main},
  { path: '/myrwt/data', title: '用户管理', component: Data},
]

//导出路由信息
export default RoutesMessage;
