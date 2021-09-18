/*
 * @Author: LiCW
 * @Date: 2021-09-14 16:15:25
 * @LastEditTime: 2021-09-18 11:56:58
 * @LastEditors: LiCW
 * @Description: 表单控件
 * @FilePath: \react-webpack-ts-project\src\components\operation\form\PublicForm.tsx
 * @Module ../../ts/Form
 */

import React from 'react'
import { Form, Input } from 'antd';

/** 引入定义的类型 */
import { FormProps } from '../../ts/Form'

/**
 * @description: 新增以及修改共用表单
 * @param {FormInstance<number>} form - 表单实例
 * @return {JSX.Element}
 */

const PublicForm = (props:FormProps) => {
  return (
    <Form
      form={props.form}
      layout="vertical"
      name="form_in_modal"
    >
      <Form.Item 
        name="name" 
        label="姓名"
        rules={[
        {
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]*$/,
          required: true,
          message: '输入格式错误，只支持中文，数字、英文，不区分大小写',
        },
      ]}
        >
        <Input/>
      </Form.Item>
      <Form.Item
        name="age" 
        label="年龄"
        rules={[
        {
          pattern: /^([1-9]|[1-9]\d|1[0-4]\d|150)$/,
          required: true,
          message: '请输入大于0小于150的数字',
        },
      ]}
        >
        <Input/>
      </Form.Item>
    </Form>
  )
}

export default PublicForm
