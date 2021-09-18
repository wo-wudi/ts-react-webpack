/*
 * @Author: LiCW
 * @Date: 2021-09-07 12:02:18
 * @LastEditTime: 2021-09-18 14:50:16
 * @LastEditors: LiCW
 * @Description: 定义请求数据返回的结果的类型
 * @FilePath: \react-webpack-ts-project\src\components\ts\Data.ts
 */

/** 用户信息的类型Users */
export interface Users {
  id: number
  name: string
  deleted: number | string
  age: number
  createDate: string
}

/** 请求结果中保存用户类型的Data中的内容的类型 */
export interface usersData {
  total: number
  rows: Users[]
}

/** 展示数据每一列的类型Columns */
export interface Columns extends Users {}

/** 请求结果中保存数据部分的类型 */
interface  commonResultData {
  code: number
  message: string
  success: boolean
}

/** 返回请求数据结果Res中的Data中内容的类型 */
export interface ResData extends commonResultData {
  data: usersData
}
/** 返回增删改查恢复使用操作的结果Result中的Data中内容的类型 */
export interface ResultData extends commonResultData {
  data: Users
}

/** 返回的结果中的数据类型 */
interface commonResult {
  status: number
  statusText: string
}

/** 请求返回的结果Res */
export interface Res extends commonResult {
  data: ResData
}

/** 请求返回增删改查恢复使用操作的结果Result */
export interface Result extends commonResult {
  data: ResultData
}
