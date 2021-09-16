//引入用户相关信息的类型
import { Users } from './Data'
//定义新增页控制对话框的变量类型以及方法类型
export interface showModel{
  visible: boolean
  onCreate: (values:Users) => Promise<void>
  onCancel: () => void
}
//定义需要新增项的参数类型
export interface AddData {
  addUser: (newUser:Users) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}