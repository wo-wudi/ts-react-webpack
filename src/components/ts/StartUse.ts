/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:30:05
 * @LastEditTime: 2021-09-18 14:58:22
 * @LastEditors: LiCW
 * @Description: 恢复使用模块所需的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\StartUse.ts
 * @Module ./Data
 */

import { Columns } from './Data'

/** 需要恢复使用项的参数类型 */
export interface UseData {
  useData: Columns
  startUse: (startUseId:number) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}