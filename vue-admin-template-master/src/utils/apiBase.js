import axios from 'axios';
import { removeToken,getToken,getTenantID} from '@/utils/auth'

const service = axios.create({
  baseURL: "http://localhost:21021",
  timeout: 50000,
})

// 请求拦截器 
service.interceptors.request.use(config => {
  config.headers.common['.AspNetCore.Culture'] = 'zh-hans'
  config.headers.common['Abp.TenantId'] = undefined
  const token = getToken()

  let TenantID
  // if(getTenantID()==undefined)
  //   {
  //     console.log("getTenantID()==undefined");
  //     TenantID = 1006
  //   }
  // else{
    TenantID = getTenantID()
  // }

  // console.log(getTenantID());
  // console.log(TenantID);
  // console.log(typeof TenantID);
  // console.log(typeof getTenantID());
  // console.log(TenantID == Number(getTenantID()));
  if(TenantID){
    config.headers.common['Abp.TenantId'] = Number(TenantID)
  }
  if(token) {
    config.headers.common['Authorization'] = 'Bearer ' + token 
  }
  return config
},error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  return response
},error => {
  if( error.response && error.response.status == 401) {
    removeToken()
    location.reload()
  }
  return Promise.reject(error)
})

export default service