//404错误匹配的页面
import React from 'react'
import { Result } from 'antd';

//404页面
const notFound = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="对不起，找不到请求的资源"
  />
  )
}

export default notFound
