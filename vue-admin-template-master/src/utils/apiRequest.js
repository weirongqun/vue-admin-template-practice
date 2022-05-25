import service from './apiBase.js'

// POST方法
export function axiosPost(path, data, prefix = '/api/services/app/') {
  let postPro = new Promise((resolve, reject) => {
    service({
      url: prefix + path,
      method: 'post',
      data: data,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(`${path}调用失败：${err}`);
      reject(`调用失败: ${err}`)
    })
  })
  return postPro
}

// GET 方法
export function axiosGet(path, data, prefix = '/api/services/app/') {
  let getPro = new Promise((resolve, reject) => {
    service({
      url: prefix + path,
      method: 'get',
      params: data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(`${path}调用失败：${err}`);
      reject(`调用失败: ${err}`)
    })
  })
  return getPro
}

// PUT 方法
export function axiosPut(path, data, prefix = '/api/services/app/') {
  let putPro = new Promise((resolve, reject) => {
    service({
      url: prefix + path,
      method: 'put',
      data: data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(`${path}调用失败：${err}`);
      reject(`调用失败: ${err}`)
    })
  })
  return putPro
}

// DELETE 方法
export function axiosDel(path, data, prefix = '/api/services/app/') {
  let delPro = new Promise((resolve, reject) => {
    service({
      url: prefix + path,
      method: 'delete',
      params: data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(`${path}调用失败：${err}`);
      reject(`调用失败: ${err}`)
    })
  })
  return delPro
}