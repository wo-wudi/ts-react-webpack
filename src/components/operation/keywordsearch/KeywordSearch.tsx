/*
 * @Author: LiCW
 * @Date: 2021-09-14 09:53:10
 * @LastEditTime: 2021-09-18 14:18:23
 * @LastEditors: LiCW
 * @Description: 按关键字查询用户
 * @FilePath: \react-webpack-ts-project\src\components\operation\keywordsearch\KeywordSearch.tsx
 */

import React from 'react'
import { Form, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/** 引入类型定义 */
import { SearchKeyword, keywordSearch } from '../../ts/KeyWordSearch'

/**
 * @description: 关键字查询组件
 * @param {(keyword: string) => Promise<void>} keywordSearch - 根据输入的关键字进行查询的方法
 * @return {JSX.Element}
 */

const KeywordSearch = (props:keywordSearch) => {
  const [ form ] = Form.useForm()
  /**
   * @description: 获取表单输入的关键字
   * @param {string} name - 姓名关键字
   * @return {void}
   */  

  const onSearch = (value:SearchKeyword) => {
    /** 将要查询的关键字信息传给查询方法进行查询 */
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
