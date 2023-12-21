import request from '@/utils/request'

export function queryStat(query) {
  return request({
    url: `/surgery/stat/query/${query.table}/${query.year}/${query.month ? query.month : 0}`,
    method: 'get',
    params: query.query
  })
}

export function buildStat(query) {
  return request({
    url: `/surgery/stat/build/${query.table}/${query.year}/${query.month ? query.month : 0}`,
    method: 'get',
    params: query.query
  })
}

export function statMonth() {
  return request({
    url: `/dashboard/stat/month`,
    method: 'get'
  })
}

export function statOffice() {
  return request({
    url: `/dashboard/stat/office`,
    method: 'get'
  })
}

export function getRoomOverview(time) {
  return request({
    url: `/surgery/room/overview?time=${time}`,
    method: 'get'
  })
}

export function getRoomSurgery(query) {
  return request({
    url: `/surgery/detail`,
    method: 'get',
    params: query
  })
}

export function getRoomDeviceData(query) {
  return request({
    url: `/surgery/room/${query.id}/data`,
    method: 'get',
    params: { begin: query.begin, end: query.end }
  })
}

export function getEvent(query) {
  return request({
    url: `/surgery/event`,
    method: 'get',
    params: query
  })
}
