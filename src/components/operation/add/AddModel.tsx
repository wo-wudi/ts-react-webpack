/*
 * @Author: your name
 * @Date: 2021-09-17 15:16:07
 * @LastEditTime: 2021-09-18 09:43:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-webpack-ts-project\src\components\operation\add\AddModel.tsx
 */
//导入react和antd相关
import React from 'react';
import { Modal, Form } from 'antd';
import { showModel } from '../../ts/Add'
//引入form表单
import PublicForm from '../form/PublicForm'

//新增数据对话框
const AddModel = (Model:showModel) => {
  //创建form控制实例
  const [ form ] = Form.useForm();
  return (
    <Modal
      title="新增数据"
      okText="确认"
      cancelText="取消"
      visible={Model.visible}
      onCancel={Model.onCancel}
      onOk={() => {
        form
        .validateFields()
        .then((values) => {
          form.resetFields();
          Model.onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
      }}
    >
     <PublicForm form={form} />
    </Modal>
  );
};

export default AddModel