/*
 * @Author: LiCW
 * @Date: 2021-09-15 10:50:56
 * @LastEditTime: 2021-09-18 14:51:36
 * @LastEditors: LiCW
 * @Description: 新增模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\Add.ts
 * @Moudle ./Data
 */

import { Users } from './Data'

/** 定义新增页控制对话框的变量类型以及方法类型 */
export interface showModel{
  visible: boolean
  onCreate: (values:Users) => Promise<void>
  onCancel: () => void
}

/** 定义需要新增项的参数类型 */
export interface AddUser {
  addUser: (newUser:Users) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}