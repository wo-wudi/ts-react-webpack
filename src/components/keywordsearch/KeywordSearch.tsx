//导入react和antd相关
import React from 'react'
import { Form, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
//引入类型定义
import { SearchKeyword, keywordSearch } from '../ts/KeyWordSearch'

//关键字查询组件
const KeywordSearch = (props:keywordSearch) => {
  const [ form ] = Form.useForm()
  //使用关键字查询
  const onSearch = (value:SearchKeyword) => {
    //将要查询的关键字信息传给查询方法进行查询
    props.keywordSearch(value.name)
  }
  return (
    <div style={{display: 'flex',justifyContent: 'space-between'}}>
      <Form
        style={{ marginLeft: 8 }}
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item name="name">
          <Input placeholder='请输入姓名关键字'/>
        </Form.Item>
      </Form>
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{ marginLeft: 8 }}
        onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onSearch(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
      >查询</Button>
    </div>
  )
}
export default KeywordSearch
