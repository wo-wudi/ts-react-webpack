import { Columns } from './Data'
//定义需要删除项的接收的参数类型
export interface DelData {
  delData: Columns
  deleteUser: (deleteUserId:number) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}