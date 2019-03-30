import axios from 'axios'
import util from './util'
import { Message } from 'iview'

// 记录和显示错误
function errorLog (err) {
// 显示提示
Message.error({
  content: err,
  duration: 3
})

}
// 创建一个 axios 实例
const service = axios.create({
    // baseURL: "",
    timeout: 5000 // 请求超时时间
  })

  // service.defaults.baseURL = 'https://api.example.com';

  // 添加请求拦截器
  service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // dataAxios 是 axios 返回数据中的 data
  const dataAxios = response.data
  // // 这个状态码是和后端约定的
  const { code } = dataAxios
  // 根据 code 进行判断
  if (code === undefined) {
    // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
    return dataAxios
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 0:
        util.showMessage(dataAxios)
        // [ 示例 ] code === 0 代表没有错误
        return dataAxios.data
      case 1:
        // [ 示例 ] 其它和后台约定的 code
        errorLog(`code ${code} ${dataAxios.msg}: ${response.config.url}`)
        break
      default:
        // 不是正确的 code
        errorLog(`${dataAxios.msg}: ${response.config.url}`)
        break
    }
  }
  // return response;
}, function (error) {
  // 对响应错误做点什么
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        break
    }
  } else {
    // error.message = '网络错误'
    if (error.toString().indexOf('timeout') !== -1) {
      error.message = '请求超时'
    } else {
      error.message = '网络错误'
    }
  }
  errorLog(error)
  return Promise.reject(error);
});

export default service
