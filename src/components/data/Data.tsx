/*
 * @Author: LiCW
 * @Date: 2021-09-09 09:40:01
 * @LastEditTime: 2021-09-26 12:19:49
 * @LastEditors: Please set LastEditors
 * @Description: 展示数据包括增删改查恢复使用功能
 * @FilePath: \react-webpack-ts-project\src\components\data\Data.tsx
 * @Module ../ts/Data
 * @Module ../operation/add/Add
 * @Module ../operation/delete/Delete
 * @Module ../operation/startuse/StartUse
 * @Module ../operation/update/Update
 * @Module ../operation/idsearch/IdSearch
 * @Module ../operation/keywordsearch/KeywordSearch
 * @Module ../../axios/index
 */

import React,{ useState, useEffect } from 'react';
import { Table, Space, message, Button, Switch } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

/** 引入类型定义 */
import { Users, Res, usersData, Columns } from '../ts/Data'

/** 引入增删改查以及恢复使用按钮 */
import Add from '../operation/add/Add'
import Delete from '../operation/delete/Delete';
import Update from '../operation/update/Update'
import StartUse from '../operation/startuse/StartUse'
import IdSearch from '../operation/idsearch/IdSearch'
import KeywordSearch from '../operation/keywordsearch/KeywordSearch';

/** 引入请求数据axios方法 */
import  { getData } from '../../axios/index'


/**
 * @description: 展示数据和操作的组件
 * @return {JSX.Element}
 */

const Data = () => {
  /** 获取保存在浏览器中的页数 */
  const [ NowPage ] = useState(window.sessionStorage.getItem('page'))
  let nowPage: number = 1
  if(NowPage){
    nowPage = parseInt(NowPage)
  }
  const [page,setPage] = useState(nowPage)
  const [size] = useState(6)
  const [data,setData] = useState<Users[]>([])
  const [allData,setAllData] = useState(0)
  const [total,setTotal] = useState(0)
  const [loading,setLoading] = useState(true)
  const [changeSearch, setChangeSearch] = useState(false);
  const [closePage,setClosePage] = useState(false)

  /** 生命周期中获取数据 */
  useEffect(() => {
    let cancel: boolean = false;
    const Data: () => Promise<void> = async () =>{
      const data: usersData = await getNewData(page,size)
      /** 为真才修改数据，避免内存泄漏 */
      if (!cancel){
        setData(data.rows)
        setTotal(data.total)
        setAllData(data.total);
      }
    }
    Data()
    /** 取消订阅去除警告 */
    return () => {
      cancel = true
      window.sessionStorage.removeItem('page')
    }
  },[])

  /**
   * @description: 时间类型转换函数
   * @param {string} timestamp - 需要修改的时间
   * @return {string}
   */  
  
  const transformTimes = (timestamp: string) => {
    let a: number = new Date(timestamp).getTime();
    const date: Date = new Date(a);
    const Y: string = date.getFullYear() + '-';
    const M: string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D: string = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
    const h: string = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    const m: string | number = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()) ;
    // const s = date.getSeconds(); 
    const dateString: string = Y + M + D + h + m;
    return dateString;
  }

  /**
   * @description: 获取数据的函数
   * @param {number} page - 页码
   * @param {number} size - 每页多少条数据
   * @param {string} keyword - 关键字
   * @return {Promise<usersData>}
   */  

  const getNewData = async (page:number,size:number,keyword?:string) => {
    setLoading(true)
    const result: Res= await getData<Res>(
      '/getAll',
      {
        page:page,
        size:size,
        keyword:keyword
      }
    )
    if(result.data.success){
      setLoading(false)
    }
    const NewRes: usersData = result.data.data
    /** 每一条数据显示是否可用 */
    /** 转换每一条数据的创建时间类型 */
    for(let i:number = 0;i < NewRes.rows.length;i++){
      NewRes.rows[i].deleted = NewRes.rows[i].deleted === 0 ? '是' : '否'
      NewRes.rows[i].createDate = transformTimes(NewRes.rows[i].createDate)
    }
    return NewRes
  }

  /**
   * @description: 重新启用成功后修改列表数据使表格渲染新数据
   * @param {number} startUseId - 重新启用的用户的编号
   * @return {void}
   */
  
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

  /**
   * @description: 删除成功后修改列表数据使表格渲染新数据
   * @param {number} deleteUserId - 删除用户的编号
   * @return {void}
   */  
  
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

  /**
   * @description: 修改成功后修改列表数据使表格渲染新数据
   * @param {Users} changeDataUser - 修改用户的信息
   * @return {void}
   */  
  
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

  /**
   * @description: 添加成功后在最后一页渲染新数据
   * @param {Users} newUser - 新增用户的信息
   * @return {void}
   */  
  
  const addUser = (newUser:Users) => {
    setTotal(total+1)
    setAllData(total+1)
    /** 若当前为最后一页，将新数据进行展示 */
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
      /** 若最后一页数据量满了，则在下一页暂时新增的数据 */
      if(addUser.length > size){
        setPage(page+1)
        setData([newUser])
      }
      else{
        setData(addUser)
      }
    }
  }

  /**
   * @description: 改变页数请求新数据并修改当前的页码
   * @param {number} page - 当前页码
   * @return {Promise<void>}
   */  
  
  const changePage = async (page:number) => {
    let storage: Storage = window.sessionStorage
    let nowPage: string = JSON.stringify(page)
    /** 将当前页面保存在浏览器的sessionStorage中 */
    storage.setItem('page',nowPage)
    const newData: usersData = await getNewData(page,size)
    setPage(page)
    setTotal(newData.total)
    setAllData(newData.total)
    setClosePage(false)
    setData(newData.rows)
  }

  /**
   * @description: 关键字查找数据
   * @param {string} keyword - 输入的关键字
   * @return {Promise<void>}
   */
  
  const KeyWordSearch = async (keyword:string) => {
    const searchRes: usersData = await getNewData(1,allData,keyword)
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

  const searchMethod = (
    changeSearch ? '恢复使用编号查询：' : '使用关键字查询：'
  )
  
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

  /** 表格分页 */
  const paginationProps = {
    pageSize: size, 
    current: page, 
    total: total,  
    showTotal: () => `共${total}条数据`, 
    onChange: (page:number) => closePage ? setPage(page) : changePage(page), 
  }
  
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
      render: (record:Columns) => (record.deleted === '是') ?(
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
