import axios from 'axios'
//以下是全局配置axios
//默认请求地址
// axios.defaults.baseURL='http://127.0.0.1:12321/'
//请求超时时间
// axios.defaults.timeout = 10000
//请求头
// axios.defaults.headers.post['Content=Type']='application/json'

//自定义实例默认值
const myAxios = axios.create({
  timeout: 10000, // 请求超时时间
  // 默认请求地址
  //baseURL: 'http://172.18.0.171:9999/test/user',
  baseURL: 'http://127.0.0.1:9999/test/user',
  // method: 'get', //默认请求方法
  //表单form的enctype属性的编码方式有两种：application/x-www-form-urlencode和multipart/form-data）
  //但是axios会把请求的数据转换成json格式，即为：application/json;charset=UTF-8，所以格式不同，就取不值了。
  headers: {
    'Content-Type': 'application/json'
  } // 请求头
})

// 在实例已创建后修改默认值
//myAxios.defaults.timeout = 8000;

//请求拦截 在自定义实例中添加 myAxios.interceptors.request.use
myAxios.interceptors.request.use(
  config => {
    //发送请求之前做些什么
    return config
  },
  error => {
    //对请求错误做点什么
    return Promise.reject(error)
  }
)
//响应拦截器 在自定义实例中添加 myAxios.interceptors.response.use
myAxios.interceptors.response.use(
  response => {
    // 如果返回状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if(response.status === 200){
      return Promise.resolve(response)
    }
    else{
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的情况
  // 可以与后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等
  error => {
    if(error.response.status){
      switch (error.response.status){
        // 401:未登录
        // 未登录则跳转登录界面，并携带当前页面的路径
        // 在登陆成功后返回当前页面，这一步需要在登录页操作
        // case 401:
        //404状态码跳转
        case 404:
          window.location.href = '/#/404'
          break
        default:
          console.log('其他提示')
      }
      return Promise.reject(error.response)
    }
  }
)
//返回请求结果
function myRequest<T>(p: Promise<T>): T {
    return p.then(res => res).catch(err => err) as unknown as T;
}
//geDatat请求数据
export async function getData<T>(url: string, params: object): Promise<T> {
  return await myRequest<T>(myAxios.get(url,{params}));
}
//searchData查找数据
export async function searchData<T>( url: string, params: number): Promise<T> {
  return await myRequest<T>(myAxios.get(url + params));
}
//deleteData删除数据
export async function deleteData<T>(url: string, params: number): Promise<T> {
  return await myRequest<T>(myAxios.delete(url + params));
}
//postData新增数据
export async function postData<T>(url: string,params:string): Promise<T> {
  return await myRequest<T>(myAxios.post(url,params));
}
//useData恢复数据使用
export async function useData<T>(url: string, params: number): Promise<T> {
  return await myRequest<T>(myAxios.put(url + params));
}
//putData修改数据
export async function putData<T>(url: string,params:string): Promise<T> {
  return await myRequest<T>(myAxios.put(url,params));
}