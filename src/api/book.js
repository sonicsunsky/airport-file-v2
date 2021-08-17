import request from "@/utils/request";

export const getCatalogList = data => {
  return request({
    url: "/catalog",
    method: "post",
    data
  });
};

export const getFileList = data => {
  return request({
    url: "/files",
    method: "post",
    data
  });
};
