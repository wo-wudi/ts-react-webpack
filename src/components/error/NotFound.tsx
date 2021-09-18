/*
 * @Author: LiCW
 * @Date: 2021-09-06 16:51:53
 * @LastEditTime: 2021-09-18 11:53:18
 * @LastEditors: LiCW
 * @Description: 404错误匹配页面
 * @FilePath: \react-webpack-ts-project\src\components\error\NotFound.tsx
 */
import React from 'react'
import { Result } from 'antd';

/**
 * @description: 404页面
 * @return {JSX.Element}
 */

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
