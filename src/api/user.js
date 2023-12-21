import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/local',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/users/me',
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => resolve())
}

export function logout() {
  // return request({
  //   url: '/connect',
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => resolve())
}

export function upload(data) {
  console.log('call upload')
  return request({
    url: '/upload/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function fetchCount(query) {
  return request({
    url: '/users/count',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/users/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
