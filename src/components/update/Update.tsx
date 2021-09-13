//引入react和antd相关
import React, { useState } from 'react';
import { Drawer, Button, Space, Form, Input } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';

//引入数据类型
import { Columns, Result, Users } from '../ts/Data'
//引入修改数据axios方法
import { putData } from '../../axios/index'

//定义修改数据的类型
type upData = Omit<Columns, 'createDate' | 'deleted'>
//定义修改数据项的参数类型
interface UpData {
  upData: Columns
  changeData: (changeDataUse:Users) => void
}
//修改数据组件
const Update = (props:UpData) => {
  //控制抽屉显示的变量
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  //显示抽屉
  const showDrawer = () => {
    setVisible(true);
  };
  //隐藏抽屉
  const onClose = () => {
    setVisible(false);
  };
  //更新数据
  const onUpdata = async (changeDataUse: Users) => {
    setVisible(false);
    changeDataUse.age= Number(changeDataUse.age)
    changeDataUse.id=props.upData.id
    props.changeData(changeDataUse)
    const updata = await putData<Result>('/update',JSON.stringify(changeDataUse))
    console.log(updata);
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
        onClose={onClose}
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
      </Drawer>
    </>
  );
};
export default Update