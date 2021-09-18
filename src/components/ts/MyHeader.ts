/*
 * @Author: LiCW
 * @Date: 2021-09-17 09:26:43
 * @LastEditTime: 2021-09-18 14:57:30
 * @LastEditors: LiCW
 * @Description: 头部模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\MyHeader.ts
 */

/** 头部参数类型 */
export interface MyHeader {
  collapsed: boolean
  closeShow:React.Dispatch<React.SetStateAction<boolean>>
}