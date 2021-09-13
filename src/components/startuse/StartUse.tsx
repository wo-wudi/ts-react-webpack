//引入react和antd相关
import React from 'react';
import { Popconfirm, message, Button} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
//导入恢复使用axios方法
import { useData } from '../../axios/index';
//引入数据类型
import { Columns, Result } from '../ts/Data'

//引入样式
require('./style/StartUse.css')
//需要恢复使用项的参数类型
interface UseData {
  useData: Columns
  startUse: (startUseId:number) => void
}

//恢复使用按钮的确认事件
const confirm = async (props:UseData) => {
  props.useData.deleted='是'
  const id = props.useData.id
  props.startUse(id)
  const result = await useData<Result>(
    '/reduction/',
    id
  )
  console.log(result);
  message.success('恢复成功');
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
