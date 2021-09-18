/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:00:26
 * @LastEditTime: 2021-09-18 14:54:07
 * @LastEditors: LiCW
 * @Description: 删除模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\Delete.ts
 * @Module ./Data
 */

import { Columns } from './Data'

/** 定义需要删除项的接收的参数类型 */
export interface DelUser {
  delData: Columns
  deleteUser: (deleteUserId:number) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}