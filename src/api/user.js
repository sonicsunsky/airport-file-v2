import request from "@/utils/request";

export const getBlockUserList = data => {
  return request({
    url: "/openapi/work/query_users",
    method: "post",
    data
  });
};

export const updateUserStatus = data => {
  return request({
    url: "/openapi/work/user/update",
    method: "post",
    data
  });
};

export const deleteArticle = data => {
  return request({
    url: "/openapi/work/post/trash",
    method: "post",
    data
  });
};
