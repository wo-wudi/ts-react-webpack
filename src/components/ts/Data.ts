//用户信息的类型Users
export interface Users {
  id: number
  name: string
  deleted: number | string
  age: number
  createDate: string
}
//请求结果中保存用户类型的Data中的内容的类型
export interface Data {
  total: number
  rows: Users[]
}
//返回请求数据结果Res中的Data中内容的类型
export interface ResData {
  code: number
  data: Data
  message: string
  success: boolean
}
//返回增删改查恢复使用操作的结果Result中的Data中内容的类型
export interface ResultData {
  code: number
  data: Users
  message: string
  success: boolean
}
//请求返回的结果Res
export interface Res {
  status: number
  statusText: string
  data: ResData
}
//请求返回增删改查恢复使用操作的结果Result
export interface Result {
  status: number
  statusText: string
  data: ResultData
}
//展示数据每一列的类型Columns
export interface Columns {
  id: number
  name: string
  deleted: number | string
  age: number
  createDate: string
}