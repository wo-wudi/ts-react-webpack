//引入数据类型
import { Columns } from './Data'
//需要恢复使用项的参数类型
export interface UseData {
  useData: Columns
  startUse: (startUseId:number) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}