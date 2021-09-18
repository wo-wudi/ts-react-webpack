/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:33:26
 * @LastEditTime: 2021-09-18 14:53:17
 * @LastEditors: LiCW
 * @Description: 修改模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\UpData.ts
 * @Module ./Data
 */

import { Columns, Users } from './Data'

/** 定义修改数据项的参数类型*/
export interface UpData {
  upData: Columns
  changeData: (changeDataUse:Users) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}