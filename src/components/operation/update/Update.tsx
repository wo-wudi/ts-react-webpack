/*
 * @Author: LiCW
 * @Date: 2021-09-07 11:24:10
 * @LastEditTime: 2021-09-18 14:24:51
 * @LastEditors: LiCW
 * @Description: 修改用户信息
 * @FilePath: \react-webpack-ts-project\src\components\operation\update\Update.tsx
 * @Module ../../ts/Data
 * @Module ../../ts/UpData
 * @Module ../../../axios/index
 * @Module ../form/PublicForm
 */

import React, { useState } from 'react';
import { Drawer, Button, Space, Form, message } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';

/** 引入数据类型 */
import { Result, Users } from '../../ts/Data'
import { UpData } from '../../ts/UpData'

/** 引入修改数据axios方法 */
import { putData } from '../../../axios/index'

/** 引入form表单 */
import PublicForm from '../form/PublicForm'

/**
 * @description: 修改数据组件
 * @param {Columns}  upData - 修改的用户信息
 * @param {(changeDataUse:Users) => void}  changeData - 将修改的用户信息渲染到页面上的方法
 * @param {React.Dispatch<React.SetStateAction<boolean>>}  setLoading - 加载中显示的方法
 * @return {*}
 */

const Update = (props:UpData) => {
  /** 控制抽屉显示的变量 */
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  /**
   * @description: 显示抽屉
   * @return {void}
   */
  
  const showDrawer = () => {
    setVisible(true);
  };

  /**
   * @description: 隐藏抽屉
   * @param {*}
   * @return {*}
   */
  
  const onClose = () => {
    setVisible(false);
  };

  /**
   * @description: 更新数据
   * @param {Users} changeDataUse - 需要修改的用户信息
   * @return {Promise<void>}
   */
  
  const onUpdata = async (changeDataUse: Users) => {
    props.setLoading(true)
    changeDataUse.age= Number(changeDataUse.age)
    changeDataUse.id=props.upData.id
    const updata: Result = await putData<Result>('/update',JSON.stringify(changeDataUse))
    if(updata.data.success){
      message.success('修改成功');
      /** 修改成功后将修改信息传给修改方法对该用户进行新数据的展示 */
      props.changeData(changeDataUse)
      props.setLoading(false)
    }
    else{
      message.error(updata.data.message)
      props.setLoading(false)
    }
    setVisible(false);
  }
  
  return (
    <>
      <Space>
        <Button 
          icon={<HighlightOutlined />} 
          type="primary" 
          onClick={showDrawer}
        >
          编辑
        </Button>
      </Space>
      <Drawer
        title="编辑数据"
        width={500}
        visible={visible}
        footer={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button 
              type="primary" 
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    onUpdata(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}>
              修改
            </Button>
          </Space>
        }
        onClose={onClose}
      >
       <PublicForm form={form} />
      </Drawer>
    </>
  );
};
export default Update