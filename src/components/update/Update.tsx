//引入react和antd相关
import React, { useState } from 'react';
import { Drawer, Button, Space, Form, Input, message } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
//引入数据类型
import { Columns, Result, Users } from '../ts/Data'
import { UpData } from '../ts/UpData'
//引入修改数据axios方法
import { putData } from '../../axios/index'
//引入form表单
import PublicForm from '../form/PublicForm'

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
    //更新数据之前显示加载中
    props.setLoading(true)
    changeDataUse.age= Number(changeDataUse.age)
    changeDataUse.id=props.upData.id
    const updata: Result = await putData<Result>('/update',JSON.stringify(changeDataUse))
    if(updata.data.success){
      message.success('修改成功');
      //修改成功后将修改信息传给修改方法对该用户进行新数据的展示
      props.changeData(changeDataUse)
      //修改成功后取消加载中
      props.setLoading(false)
    }
    else{
      message.error(updata.data.message)
      //修改失败后取消加载中
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