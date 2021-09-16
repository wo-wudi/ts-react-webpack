import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
//引入类型定义
import { Result } from '../ts/Data'
import { SearchId, Idsearch } from '../ts/IdSearch'
//引入请求数据和查询数据axios方法
import  { searchData } from '../../axios/index'

//定义按编号查询组件
const IdSearch = (props:Idsearch) => {
  const [ form ] = Form.useForm()
  //查询用户
  const onSearch = async (value:SearchId) => {
    //按编号查询之前显示加载中
    props.setLoading(true)
    const searchRes: Result = await searchData<Result>(
      '/get/',
      value.id
    )
    if(searchRes.data.data !== null){
      message.success('查询成功')
      //显示查询结果的创建时间
      searchRes.data.data.createDate = props.transformTimes(searchRes.data.data.createDate)
      //显示查询结果中的是否可以
      searchRes.data.data.deleted = searchRes.data.data.deleted=== 0 ? '是' : '否'
      //讲查询结果展示
      props.setData([searchRes.data.data])
      //设置查询后的数据总数
      props.setTotal(1)
      //查询成功后取消加载中
      props.setLoading(false)
    }
    else{
      message.warning('查询失败，该用户不存在')
      //查询失败取消加载中
      props.setLoading(false)
    }
  }
  return (
    <div style={{display: 'flex',justifyContent: 'space-between'}}>
      <Form
        style={{ marginLeft: 8 }}
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item name="id">
          <Input placeholder='请输入编号'/>
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

export default IdSearch
