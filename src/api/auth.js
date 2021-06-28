import request from "@/utils/request";

export const getUserAuth = data => {
  // 返回值 code=100调用成功，其它值失败。登录成功返回用户基本信息及登录令牌。
  // 用户类型说明(领导:LEADER,维修员:SERVICEMAN,治安巡视员:POLICE,消防巡视员:FIREMEN,监察员:MONITOR,值班保障:DUTY)
  // 登录令牌在后续请求中放在header中(authorization:token)
  return request({
    url: "/auth",
    method: "post",
    data
  });
};
