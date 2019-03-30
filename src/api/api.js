import request from '../util/axios'

// 获取点赞数量
export function getPriseNum () {
  return request({
    url: '/blog/web/getPriseNum',
    method: 'get'
  })
}

// 点赞
export function addPriseNum () {
  return request({
    url: '/blog/web/addPriseNum',
    method: 'get'
  })
}

// 获取所有分类和标签及其数量
export function getTagsAndCategories() {
  return request({
    url: '/blog/web/getTagsAndCategories',
    method: 'get'
  })
}

// 获取所有文章列表，如果有传keyword,则根据keyword搜索
export function getArticleList({page,keyword}) {
  return request({
    url: '/blog/web/getArticleList',
    method: 'post',
    data: {
      page,
      keyword
    }
  })
}

// 根据文章id获取文章详情
export function getArticleDetailByid(id) {
  return request({
    url: `/blog/web/getArticleDetail/${id}`,
    method: 'get'
  })
}

// 根据分类搜索文章
export function searchByCategoryId(id,page = 1) {
  return request({
    url: `/blog/web/searchByCategory/${id}/${page}`,
    method: 'get'
  })
}

// 根据标签搜索
export function searchByTagId(id,page = 1) {
  return request({
    url: `/blog/web/searchByTag/${id}/${page}`,
    method: 'get'
  })
}
