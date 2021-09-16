import { Columns, Users } from './Data'
//定义搜索对应id的类型
export type SearchId = Omit<Columns,'name' | 'deleted' | 'age' | 'createDate'>
//定义接收的参数类型
export interface Idsearch{
  transformTimes: (timestamp: string) => string
  setData: React.Dispatch<React.SetStateAction<Users[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}