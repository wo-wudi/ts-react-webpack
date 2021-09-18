/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:18:53
 * @LastEditTime: 2021-09-18 14:56:16
 * @LastEditors: LiCW
 * @Description: 按关键字搜索模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\KeyWordSearch.ts
 * @Module ./Data
 */

import { Columns } from './Data'

/** 定义搜索对应关键字的类型 */
export type SearchKeyword = Omit<Columns,'id' | 'deleted' | 'age' | 'createDate'>

/** 定义参数类型 */
export interface keywordSearch{
  keywordSearch: (keyword: string) => Promise<void>
}