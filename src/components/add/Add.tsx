//导入react和antd相关
import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//导入新增数据的axios
import { postData } from '../../axios/index'
//导入数据类型
import { Result, Users } from '../ts/Data'
import { showModel, AddData } from '../ts/Add'
//引入form表单
import PublicForm from '../form/PublicForm'

//新增数据对话框
const FormInModel = (Model:showModel) => {
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
//新增数据组件
const Add = (props:AddData) => {
  //控制对话框显示的变量
  const [visible, setVisible] = useState(false);
  //新增数据的方法
  const AddData = async (values:Users) => {
    //新增数据成功之前显示加载中
    setVisible(false);
    props.setLoading(true)
    values.age= Number(values.age)
    //新增数据
    const res: Result = await postData<Result>('/add',JSON.stringify(values))
    if(res.data.success){
      //新增成功后将新增的用户信息传给新增方法进行展示
      props.addUser(values)
      message.success('添加成功')
      //添加数据成功后取消加载中
      props.setLoading(false)
    }
    else{
      message.error(res.data.message)
      //添加数据失败后取消加载中
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
      <FormInModel
        visible={visible}
        onCreate={AddData}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Add