import request from '@/utils/request'
import store from '../store'

export function fetchList(query) {
  return request({
    url: '/orgs',
    method: 'get',
    params: query
  })
}

export function fetchOffices() {
  return fetchList({
    'parent': store.getters.org.id
  })
}

export function fetchCount(query) {
  return request({
    url: '/orgs/count',
    method: 'get',
    params: query
  })
}

export function fetchOrg(id) {
  return request({
    url: '/orgs/' + id,
    method: 'get'
  })
}

export function createOrg(data) {
  return request({
    url: '/orgs',
    method: 'post',
    data
  })
}

export function updateOrg(data) {
  return request({
    url: '/orgs/' + data.id,
    method: 'put',
    data
  })
}

export function deleteOrg(id) {
  return request({
    url: '/orgs/' + id,
    method: 'delete'
  })
}
