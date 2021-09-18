/*
 * @Author: LiCW
 * @Date: 2021-09-07 17:41:23
 * @LastEditTime: 2021-09-18 12:24:11
 * @LastEditors: LiCW
 * @Description: 新增用户
 * @FilePath: \react-webpack-ts-project\src\components\add\Add.tsx
 * @module ../../../axios/index
 * @module ../../ts/Data
 * @module ../../ts/Add
 * @module ../form/PublicForm
 */

import React, { useState } from 'react';
import { Button, message, Modal, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

/** 引入新增用户的axios方法 */
import { postData } from '../../../axios/index'

/** 引入类型定义 */
import { Result, Users } from '../../ts/Data'
import { AddUser, showModel } from '../../ts/Add'

/** 引入form表单 */
import PublicForm from '../form/PublicForm'

/**
 * @description: 新增组件对话框
 * @param {boolean} visible - 控制对话框显示的比哪里
 * @param {() => void} onCancel - 关闭对话框的方法
 * @param {(values:Users) => Promise<void>} onCreate - 新增数据的方法并接受表单的值为参数
 * @return {JSX.Element}
 */

const AddModel = (Model:showModel) => {
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

/**
 * @description: 新增数据组件
 * @param {(newUser:Users) => void} addUser - 新增用户的方法
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 修改加载中的方法
 * @return {JSX.Element}
 */

const Add = (props:AddUser) => {
  /** 控制对话框显示的变量及方法 */
  const [visible, setVisible] = useState(false);

  /**
   * @description: 新增用户方法
   * @param {Users} values - 获取表单输入的值
   * @return {Promise<void>}
   */

  const addUser = async (values:Users) => {
    setVisible(false);
    props.setLoading(true)
    values.age= Number(values.age)
    const res: Result = await postData<Result>('/add',JSON.stringify(values))
    if(res.data.success){
      props.addUser(values)
      message.success('添加成功')
      props.setLoading(false)
    }
    else{
      message.error(res.data.message)
      props.setLoading(false)
    }
  };

  return (
    <div style={{marginBottom: 20}}>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
      <AddModel
        visible={visible}
        onCreate={addUser}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Add