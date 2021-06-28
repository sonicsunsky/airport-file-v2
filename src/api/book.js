import request from "@/utils/request";

export const getTrendData = data => {
  return request({
    url: "/openapi/work/post/count",
    method: "post",
    data
  });
};

export const getRankData = data => {
  return request({
    url: "/openapi/work/author/postcount",
    method: "post",
    data
  });
};

export const getPercentData = data => {
  return request({
    url: "/openapi/work/posttype/count",
    method: "post",
    data
  });
};

export const getCategoryList = data => {
  return request({
    url: "/openapi/portal/tax/list",
    method: "post",
    data
  });
};

export const getDataList = data => {
  return request({
    url: "/openapi/work/query_posts",
    method: "post",
    data
  });
};

export const updateData = data => {
  return request({
    url: "/openapi/work/post/update",
    method: "post",
    data
  });
};

export const getArticleDetail = data => {
  return request({
    url: "/openapi/work/post/getInfo",
    method: "post",
    data
  });
};
