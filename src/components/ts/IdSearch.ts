/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:10:48
 * @LastEditTime: 2021-09-18 14:55:35
 * @LastEditors: LiCW
 * @Description: 按编号搜索模块的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\IdSearch.ts
 */

import { Columns, Users } from './Data'

/** 定义搜索对应id的类型 */
export type SearchId = Omit<Columns,'name' | 'deleted' | 'age' | 'createDate'>

/** 定义接收的参数类型 */
export interface Idsearch{
  transformTimes: (timestamp: string) => string
  setData: React.Dispatch<React.SetStateAction<Users[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}