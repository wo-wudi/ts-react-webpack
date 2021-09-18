/*
 * @Author: LiCW
 * @Date: 2021-09-15 11:07:56
 * @LastEditTime: 2021-09-18 14:54:51
 * @LastEditors: your name
 * @Description: 表单组件的类型定义
 * @FilePath: \react-webpack-ts-project\src\components\ts\Form.ts
 * @Module antd/es/form/hooks/useForm
 */

import { FormInstance } from 'antd/es/form/hooks/useForm';

/** 设置传入的表单的类型 */
export type FormProps = {
  form: FormInstance<number>
}