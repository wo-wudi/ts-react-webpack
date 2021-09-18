/*
 * @Author: LiCW
 * @Date: 2021-09-09 16:23:41
 * @LastEditTime: 2021-09-18 12:18:02
 * @LastEditors: LiCW
 * @Description: 恢复用户使用的组件
 * @FilePath: \react-webpack-ts-project\src\components\operation\startuse\StartUse.tsx
 * @Module ../../../axios/index
 * @Module ../../ts/Data
 * @Module ../../ts/StartUse
 * @Module ./style/StartUse.css
 */

import React from 'react';
import { Popconfirm, message, Button} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

/** 导入恢复使用axios方法 */
import { useData } from '../../../axios/index';

/** 引入数据类型 */
import { Result } from '../../ts/Data'
import { UseData } from '../../ts/StartUse'

/** 引入样式 */
require('./style/StartUse.css')

/**
 * @description: 恢复使用组件
 * @param {Columns} useData - 恢复使用的用户信息
 * @param {(startUseId:number) => void} startUse - 恢复用户使用的页面展示数据的方法
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 控制加载中的方法
 * @return {JSX.Element}
 */

const StartUse = (props:UseData) => {
  /**
   * @description: 恢复使用按钮的确认事件
   * @return {Promise<void>}
   */

  const confirm = async () => {
    /** 恢复使用之前显示加载中 */
    props.setLoading(true)
    const id: number = props.useData.id
    const result: Result = await useData<Result>(
      '/reduction/',
      id
    )
    if(result.data.success){
      /** 恢复成功将恢复的用户编号传给恢复使用方法对用户部分操作进行修改 */
      props.startUse(id)
      message.success('恢复成功');
      props.setLoading(false)
    }
    else{
      message.error('恢复失败，请重试')
      props.setLoading(false)
    }
  }

  /**
   * @description: 取消事件
   * @return {void}
   */
  
  const cancel = () => {
    message.error('已取消');
  }

  return (
    <div className="startuse">
      <Popconfirm
        okText="是"
        cancelText="否"
        title="确定恢复使用？"
        onConfirm={confirm}
        onCancel={cancel}
      >
        <Button 
          icon={<PlayCircleOutlined />} 
          type="primary" 
          danger
        >
          恢复使用
        </Button>
      </Popconfirm>
    </div>
  )
}

export default StartUse
