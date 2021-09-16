//引入react和antd相关
import React,{ useState, useEffect } from 'react';
import { Breadcrumb, Table, Space, message, Button, Switch } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
//引入类型定义
import { Users, Res, usersData, Columns } from '../ts/Data'
//引入增删改查以及恢复使用按钮
import Add from '../add/Add'
import Delete from '../delete/Delete';
import Update from '../update/Update'
import StartUse from '../startuse/StartUse'
import IdSearch from '../idsearch/IdSearch'
import KeywordSearch from '../keywordsearch/KeywordSearch';
//引入请求数据axios方法
import  { getData } from '../../axios/index'

//定义函数组件
const Data = () => {
  //获取保存在浏览器中的页数
  const [ NowPage ] = useState(window.sessionStorage.getItem('page'))
  //默认第一页
  let nowPage: number = 1
  //如果浏览器中有则设置为浏览器中的页数否则为第一页
  if(NowPage){
    nowPage = parseInt(NowPage)
  }
  //定义请求数据的参数初始值
  const [page,setPage] = useState(nowPage)
  //每页六条数据
  const [size] = useState(6)
  //保存请求结果
  const [data,setData] = useState<Users[]>([])
  //保存请求返回的总数据量
  const [allData,setAllData] = useState(0)
  //保存显示的总数据量
  const [total,setTotal] = useState(0)
  //操作未完成时显示加载中图标
  const [loading,setLoading] = useState(true)
  //显示是否使用关键词查询
  const [changeSearch, setChangeSearch] = useState(false);
  //如果使用了关键字查询，则不使用分页查询功能
  const [closePage,setClosePage] = useState(false)
  //生命周期中获取数据
  useEffect(() => {
    let cancel: boolean = false;
    const Data: () => Promise<void> = async () =>{
      const data: usersData = await getNewData(page,size)
      //为真才修改数据，避免内存泄漏
      if (!cancel){
        setData(data.rows)
        setTotal(data.total)
        setAllData(data.total);
      }
    }
    Data()
    //取消订阅去除警告
    return () => {
      cancel = true
      window.sessionStorage.removeItem('page')
    }
  },[])
  //定义时间类型转换函数
  const transformTimes = (timestamp: string) => {
    let a: number = new Date(timestamp).getTime();
    const date: Date = new Date(a);
    //年
    const Y: string = date.getFullYear() + '-';
    //月
    const M: string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //日
    const D: string = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
    //时
    const h: string = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    //分
    const m: string | number = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()) ;
    // 秒
    // const s = date.getSeconds(); 
    const dateString: string = Y + M + D + h + m;
    return dateString;
  }
  //定义获取数据的函数
  const getNewData = async (page:number,size:number,keyword?:string) => {
    //请求开始前显示加载中
    setLoading(true)
    const result: Res= await getData<Res>(
      '/getAll',
      {
        page:page,
        size:size,
        keyword:keyword
      }
    )
    //若请求成功，则关闭加载中
    if(result.data.success){
      setLoading(false)
    }
    //保存请求返回的数据
    const NewRes: usersData = result.data.data
    //每一条数据显示是否可用
    //转换每一条数据的创建时间类型
    for(let i:number = 0;i < NewRes.rows.length;i++){
      NewRes.rows[i].deleted = NewRes.rows[i].deleted === 0 ? '是' : '否'
      NewRes.rows[i].createDate = transformTimes(NewRes.rows[i].createDate)
    }
    return NewRes
  }
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
  //添加成功后在最后一页渲染新数据
  const addUser = (newUser:Users) => {
    //新增成功修改总数据量
    setTotal(total+1)
    setAllData(total+1)
    //若当前为最后一页，将新数据进行展示
    if(page*size >= total){
      let addUser:Users[] = [...data]
      const createUserDate:Date = new Date()
      const Y:number = createUserDate.getFullYear()
      const M:number = createUserDate.getMonth()+1
      const D:number = createUserDate.getDate()
      const H:number = createUserDate.getHours()
      const Min:number = createUserDate.getMinutes()
      newUser.createDate = (Y+'-'+M+'-'+D+' '+H+':'+Min)
      newUser.id = data[data.length-1].id+1
      newUser.deleted = '是'
      addUser.push(newUser)
      //若最后一页数据量满了，则在下一页暂时新增的数据
      if(addUser.length > size){
        setPage(page+1)
        setData([newUser])
      }
      //否则直接展示新数据
      else{
        setData(addUser)
      }
    }
  }
  //改变页数请求新数据并修改当前的页码
  const changePage = async (page:number) => {
    let storage: Storage = window.sessionStorage
    let nowPage: string = JSON.stringify(page)
    //将当前页面保存在浏览器的sessionStorage中
    storage.setItem('page',nowPage)
    //分页查找数据
    const newData: usersData = await getNewData(page,size)
    setPage(page)
    setTotal(newData.total)
    setAllData(newData.total)
    setClosePage(false)
    setData(newData.rows)
  }
  //关键字查找数据
  const KeyWordSearch = async (keyword:string) => {
    //传参查找
    const searchRes: usersData = await getNewData(1,allData,keyword)
    //查询成功后展示数据
    if(searchRes.rows.length){
      message.success('查询成功')
      setTotal(searchRes.total)
      setPage(1)
      setData(searchRes.rows)
      setClosePage(true)
    }
    else{
      message.warning('查询失败，用户不存在')
    }
  }
  //控制不同文本的显示
  const searchMethod = (
    changeSearch ? '恢复使用编号查询：' : '使用关键字查询：'
  )
  //显示标号查询或者关键字查询
  const search = (
    changeSearch ? 
      <KeywordSearch 
        keywordSearch={KeyWordSearch}
      /> : <IdSearch 
        setTotal={setTotal}
        setData={setData}
        setLoading={setLoading}
        transformTimes={transformTimes}
      />
  )
  //表格分页
  const paginationProps = {
    pageSize: size, //每页显示数据量
    current: page, //当前页码
    total: total,  //数据的总的条数
    showTotal: () => `共${total}条数据`, //显示数据量
    onChange: (page:number) => closePage ? setPage(page) : changePage(page), //设置页码或分页查询
  }
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
      title: '操作',
      key: 'action',
      //根据不同的用户状态显示不同的按钮
      render: (record:Columns) => (record.deleted == '是') ?(
        <Space size="middle">
          <Update upData={record} changeData={changeData} setLoading={setLoading}/>
          <Delete delData={record} deleteUser={deleteUser} setLoading={setLoading}/>
        </Space>
      ):(<Space size="middle">
          <StartUse useData={record} startUse={startUse} setLoading={setLoading}/>
        </Space>)
    },
  ];
  return (
    <div style={{marginTop:16}}>
      <div style={{display: 'flex',justifyContent: 'space-between'}}>
        <Add setLoading={setLoading} addUser={addUser}/>
        <span style={{display: 'flex',justifyContent: 'space-between'}}>
          <Space align="center" style={{ marginBottom: 16 }}>
            {searchMethod}<Switch checked={changeSearch} onChange={setChangeSearch} />
          </Space>
          {search}
          <Button
            icon={<SyncOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => changePage(page)}
          >重置</Button>
        </span>
      </div>
      <Table 
        bordered
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={record => record.id + Math.random()}
        pagination={paginationProps}
      />
    </div>
  )
}

export default Data
