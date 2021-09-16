//react和antd相关
import React from 'react';
import { Popconfirm, message, Button} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
//引入删除数据的axios
import { deleteData } from '../../axios/index'
//引入数据类型
import { Result } from '../ts/Data'
import { DelData } from '../ts/Delete'

//删除按钮的确认弹窗
const confirm = async (props:DelData) => {
  //删除数据前显示加载中
  props.setLoading(true)
  //保存参数中的id值
  const id: number = props.delData.id
  const result: Result = await deleteData<Result>(
    '/delete/',
    id
  )
  if(result.data.success){
    //删除成功后将删除的用户编号传给删除方法进行相关信息的修改
    props.deleteUser(id)
    message.success('删除成功');
    //删除成功后取消加载中
    props.setLoading(false)
  }
  else{
    message.error('删除失败')
    //删除失败取消加载中
    props.setLoading(false)
  }
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
