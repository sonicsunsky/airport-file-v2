import request from "@/utils/request";

export const getDocumentCategory = params => {
  return request({
    url: "/document/categories",
    method: "get",
    params
  });
};

export const getDocumentList = params => {
  return request({
    url: "/document/list",
    method: "get",
    params
  });
};
