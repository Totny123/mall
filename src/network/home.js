import { request } from 'network/request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
    method: 'get'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    method: 'get',
    params: {
      type,
      page
    }
  })
}