//引入react、antd相关
import React from 'react'
import { Form, Input } from 'antd';
//引入定义的类型
import { FormProps } from '../ts/Form'

//定义新增以及修改的表单
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
