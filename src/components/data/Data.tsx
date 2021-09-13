//引入react和antd相关
import React,{ useState, useEffect } from 'react';
import { Breadcrumb, Table, Space, Form, Input, Button } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
//引入类型定义
import { Users, Res, Result, Columns } from '../ts/Data'
//引入增删改以及恢复使用按钮
import Add from '../add/Add'
import Delete from '../delete/Delete';
import Update from '../update/Update'
import StartUse from '../startuse/StartUse'
//引入请求数据和查询数据axios方法
import  { getData, searchData } from '../../axios/index'

//定义搜索对应id的类型
type SearchId = Omit<Columns,'name' | 'deleted' | 'age' | 'createDate'>

//定义函数组件
const Data = () => {
  const [form] = Form.useForm();
  //定义请求数据的参数初始值 - 第一页
  const [page,setPage] = useState(1)
  //每页五条数据
  const [size] = useState(5)
  //保存请求结果
  const [data,setData] = useState<Users[]>([])
  //保存请求返回的总数据量
  const [total,setTotal] = useState(0)

   //生命周期中获取数据
  useEffect(() => {
    let cancel: boolean = false;
    const Data = async () =>{
      const data = await getNewData(page,size)
      //为真才修改数据，避免内存泄漏
      if (!cancel){
        setData(data.rows)
        setTotal(data.total)
      }
    }
    Data()
    //取消订阅去除警告警告
    return () => {cancel = true}
  },[])
  //每一列的名称以及内容展示
  const columns: ColumnsType<Users> = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
    },
    {
      title: '是否可用',
      key: 'deleted',
      dataIndex: 'deleted',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record:Columns) => (record.deleted == '是') ?(
        <Space size="middle">
          <Update upData={record} changeData={changeData}/>
          <Delete delData={record} deleteUser={deleteUser}/>
        </Space>
      ):(<Space size="middle">
          <StartUse useData={record} startUse={startUse}/>
        </Space>)
    },
  ];
  //重新启用成功后修改列表数据使表格渲染新数据
  const startUse = (startUseId:number) => {
    let startUse:Users[] = []
    data.forEach(item => {
      if(item.id==startUseId){
        item.deleted='是'
      }
      startUse.push(item)
    })
    setData(startUse)
  }
  //删除成功后修改列表数据使表格渲染新数据
  const deleteUser = (deleteUserId:number) => {
    let deleteUser:Users[] = []
    data.forEach(item => {
      if(item.id==deleteUserId){
        item.deleted='否'
      }
      deleteUser.push(item)
    })
    setData(deleteUser)
  }
  //修改成功后修改列表数据使表格渲染新数据
  const changeData = (changeDataUser:Users) => {
    let changeData:Users[] = []
    data.forEach(item => {
      if(item.id==changeDataUser.id){
        item.name=changeDataUser.name
        item.age=changeDataUser.age
      }
      changeData.push(item)
    })
    setData(changeData)
  }
  // const addUser = (a:any) => {
  //   let addUser = [...data]
  //   const createUserDate = new Date()
  //   const Y = createUserDate.getFullYear()
  //   const M = createUserDate.getMonth()+1
  //   const D = createUserDate.getDate()
  //   const H = createUserDate.getHours()
  //   const Min = createUserDate.getMinutes()
  //   a.createDate = (Y+'-'+M+'-'+D+' '+H+':'+Min)
  //   a.id = data[data.length-1].id+1
  //   a.deleted = 0
  //   console.log(a);
  // }
  //定义时间类型转换函数
  const transformTimestamp = (timestamp: string) => {
    let a = new Date(timestamp).getTime();
    const date = new Date(a);
    //年
    const Y = date.getFullYear() + '-';
    //月
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //日
    const D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
    //时
    const h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    //分
    const m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()) ;
    // 秒
    // const s = date.getSeconds(); 
    const dateString = Y + M + D + h + m;
    return dateString;
  }
  //定义获取数据的函数
  const getNewData = async (page:number,size:number) => {
    const result = await getData<Res>(
      '/getAll',
      {
        page:page,
        size:size,
      }
    )
    console.log(result);
    const NewRes = result.data.data
    //每一条数据显示是否可用
    //转换每一条数据的创建时间类型
    for(let i =0;i<NewRes.rows.length;i++){
      NewRes.rows[i].deleted = NewRes.rows[i].deleted === 0 ? '是' : '否'
      NewRes.rows[i].createDate = transformTimestamp(NewRes.rows[i].createDate)
    }
    return NewRes
  }
  //改变页数请求新数据并修改当前的页码
  const changePage = async (page:number) => {
    const newData = await getNewData(page,size)
    setPage(page)
    setData(newData.rows)
  }
  //查询用户
  const onSearch = async (value:SearchId) => {
    const searchRes = await searchData<Result>(
      '/get/',
      value.id
    )
    searchRes.data.data.createDate = transformTimestamp(searchRes.data.data.createDate)
    searchRes.data.data.deleted = searchRes.data.data.deleted=== 0 ? '是' : '否'
    setData([searchRes.data.data])
  }
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>数据</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{display: 'flex',justifyContent: 'space-between'}}>
        <Add />
        <span style={{display: 'flex',justifyContent: 'space-between'}}>
          <Form
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
          <Button
            icon={<SyncOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => changePage(page)}
          >重置</Button>
        </span>
      </div>
      <Table 
        bordered
        loading={false}
        columns={columns}
        dataSource={data}
        rowKey={record => record.id + Math.random()}
        pagination={{
          defaultPageSize: size,
          defaultCurrent: page,
          total,
          showTotal: ()=> `共${total}条数据`,
          onChange:(page:number) => changePage(page)
        }}
      />
    </div>
  )
}

export default Data
