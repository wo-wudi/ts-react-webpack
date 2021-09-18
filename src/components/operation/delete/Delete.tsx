/*
 * @Author: LiCW
 * @Date: 2021-09-07 12:17:38
 * @LastEditTime: 2021-09-18 12:18:59
 * @LastEditors: LiCW
 * @Description: 删除用户组件
 * @FilePath: \react-webpack-ts-project\src\components\operation\delete\Delete.tsx
 * @module ../../ts/Data
 * @module ../../ts/Delete
 * @module ../../../axios/index
 */

import React from 'react';
import { Popconfirm, message, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

/** 引入删除数据的axios */
import { deleteData } from '../../../axios/index'

/** 引入数据类型 */
import { Result } from '../../ts/Data'
import { DelUser } from '../../ts/Delete'

/**
 * @description: 删除数据组件
 * @param {Columns} delData - 删除用户的信息
 * @param {(deleteUserId:number) => void} deleteUser - 删除用户的方法
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 控制加载中显示的方法
 * @return {JSX.Element}
 */

const Delete = (props:DelUser) => {
  /**
   * @description: 删除按钮的确认弹窗
   * @return {Promise<void>}
   */

  const confirm = async () => {
    props.setLoading(true)
    const id: number = props.delData.id
    const res: Result = await deleteData<Result>(
      '/delete/',
      id
    )
    if(res.data.success){
      props.deleteUser(id)
      message.success('删除成功');
      props.setLoading(false)
    }
    else{
      message.error('删除失败')
      props.setLoading(false)
    }
  }

  /**
   * @description: 取消删除
   * @return {void}
   */

  const cancel = () => {
    message.error('取消删除');
  }

  return (
    <div>
      <Popconfirm
        title="删除后不可使用，确定删除这项？"
        okText="是"
        cancelText="否"
        onCancel={cancel}
        onConfirm={confirm}
      >
        <Button 
          icon={<DeleteOutlined />}
          type="primary" 
          danger
        >
          删除
        </Button>
      </Popconfirm>
    </div>
  )
}

export default Delete
