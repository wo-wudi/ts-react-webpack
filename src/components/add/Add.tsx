//导入react和antd相关
import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//导入新增数据的axios
import { postData } from '../../axios/index'
//导入数据类型
import { Columns, Result } from '../ts/Data'

//定义新增的用户数据类型
type addData = Omit<Columns, 'createDate' | 'deleted' | 'id'>
//定义控制对话框的变量类型以及方法类型
interface showModel{
  visible: boolean
  onCreate: (values:addData) => void
  onCancel: () => void
}
//定义需要新增项的参数类型
// interface AddData {
//   addUser: (a:any) => void
// }
//新增数据对话框
const FormInModel = (p:showModel) => {
  //创建form控制实例
  const [ form ] = Form.useForm();
  return (
    <Modal
      visible={p.visible}
      title="新增数据"
      okText="确认"
      cancelText="取消"
      onCancel={p.onCancel}
      onOk={() => {
        form
        .validateFields()
        .then((values) => {
          form.resetFields();
          p.onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item name="name" label="姓名">
          <Input/>
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
//新增数据组件
const Add = () => {
  //控制对话框显示的变量
  const [visible, setVisible] = useState(false);
  //新增数据
  const onCreate = async (values:addData) => {
    values.age= Number(values.age)
    //新增数据
    // const res = await postData<Result>('/add',JSON.stringify(values))
    // props.addUser(values)
    setVisible(false);
    // console.log(res);
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
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Add