//引入类型定义
import { Columns } from './Data'
//定义搜索对应关键字的类型
export type SearchKeyword = Omit<Columns,'id' | 'deleted' | 'age' | 'createDate'>
//定义参数类型
export interface keywordSearch{
  keywordSearch: (keyword: string) => Promise<void>
}