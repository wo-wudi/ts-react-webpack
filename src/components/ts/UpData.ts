//引入数据类型
import { Columns, Users } from './Data'
//定义修改数据项的参数类型
export interface UpData {
  upData: Columns
  changeData: (changeDataUse:Users) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}