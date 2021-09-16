//引入react和antd相关
import React from 'react';
import { Popconfirm, message, Button} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
//导入恢复使用axios方法
import { useData } from '../../axios/index';
//引入数据类型
import { Result } from '../ts/Data'
import { UseData } from '../ts/StartUse'
//引入样式
require('./style/StartUse.css')

//恢复使用按钮的确认事件
const confirm = async (props:UseData) => {
  //恢复使用之前显示加载中
  props.setLoading(true)
  const id: number = props.useData.id
  const result: Result = await useData<Result>(
    '/reduction/',
    id
  )
  if(result.data.success){
    //恢复成功将恢复的用户编号传给恢复使用方法对用户部分操作进行修改
    props.startUse(id)
    message.success('恢复成功');
    //成功恢复使用后取消加载中
    props.setLoading(false)
  }
  else{
    message.error('恢复失败，请重试')
    //恢复失败取消加载中
    props.setLoading(false)
  }
}
//取消事件
const cancel = () => {
  message.error('已取消');
}
//恢复使用组件
const StartUse = (props:UseData) => {
  return (
    <div className="startuse">
      <Popconfirm
        okText="是"
        cancelText="否"
        title="确定恢复使用？"
        onConfirm={() => confirm(props)}
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
