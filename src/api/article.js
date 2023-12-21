import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts',
    method: 'get',
    params: { _start: query.page, _limit: query.limit }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/posts/findOne',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/posts/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/posts/',
    method: 'put',
    data
  })
}
