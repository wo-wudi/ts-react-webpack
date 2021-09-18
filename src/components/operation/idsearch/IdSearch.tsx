/*
 * @Author: LiCW
 * @Date: 2021-09-14 09:52:51
 * @LastEditTime: 2021-09-18 12:29:58
 * @LastEditors: LiCW
 * @Description: 按编号查询用户组件
 * @FilePath: \react-webpack-ts-project\src\components\operation\idsearch\IdSearch.tsx
 * @Module ../../ts/Data
 * @Module ../../ts/IdSearch
 * @Module ../../../axios/index
 */

import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/** 引入类型定义 */
import { Result } from '../../ts/Data'
import { SearchId, Idsearch } from '../../ts/IdSearch'

/** 引入请求数据和查询数据axios方法 */
import  { searchData } from '../../../axios/index'

/**
 * @description: 按编号查询组件
 * @param {(timestamp: string) => string} transformTimes - 修改请求结果中的时间的方法
 * @param {React.Dispatch<React.SetStateAction<Users[]>>} setData - 修改显示的用户数据的方法
 * @param {React.Dispatch<React.SetStateAction<number>>} setTotal - 修改显示的总数据量的方法
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 修改显示加载中的方法
 * @return {JSX.Element}
 */

const IdSearch = (props:Idsearch) => {
  const [ form ] = Form.useForm()

  /**
   * @description: 查询用户
   * @param {number} id - 查询的用户编号
   * @return {Promise<void>}
   */

  const onSearch = async (value:SearchId) => {
    /** 按编号查询之前显示加载中 */
    props.setLoading(true)
    const searchRes: Result = await searchData<Result>(
      '/get/',
      value.id
    )
    if(searchRes.data.data !== null){
      message.success('查询成功')
      searchRes.data.data.createDate = props.transformTimes(searchRes.data.data.createDate)
      searchRes.data.data.deleted = searchRes.data.data.deleted=== 0 ? '是' : '否'
      props.setData([searchRes.data.data])
      props.setTotal(1)
      props.setLoading(false)
    }
    else{
      message.warning('查询失败，该用户不存在')
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
