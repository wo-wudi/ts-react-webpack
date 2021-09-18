/*
 * @Author: LiCW
 * @Date: 2021-08-26 11:08:20
 * @LastEditTime: 2021-09-18 14:29:03
 * @LastEditors: LiCW
 * @Description: 注册组件
 * @FilePath: \react-webpack-ts-project\src\index.tsx
 * @module ./layout/Page
 */

import React from 'react';
import ReactDOM from 'react-dom';

/** 引入layout布局 */
import Page from './layout/LayoutDemo'

/** 注册组件 */
ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
