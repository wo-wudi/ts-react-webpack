//react和antd相关
import React from 'react';
import { Popconfirm, message, Button} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

//引入删除数据的axios
import { deleteData } from '../../axios/index'

//引入数据类型
import { Columns, Result } from '../ts/Data'

//定义需要删除项的参数类型
interface DelData {
  delData: Columns
  deleteUser: (deleteUserId:number) => void
}

//删除按钮的确认弹窗
const confirm = async (props:DelData) => {
  const id = props.delData.id
  console.log(id);
  props.deleteUser(id)
  const result = await deleteData<Result>(
    '/delete/',
    id
  )
  console.log(result);
  message.success('删除成功');
}
//取消删除
const cancel = () => {
  message.error('取消删除');
}
//删除数据组件
const Delete = (props:DelData) => {
  return (
    <div>
      <Popconfirm
        title="删除后不可使用，确定删除这项？"
        okText="是"
        cancelText="否"
        onCancel={cancel}
        onConfirm={() => confirm(props)}
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
