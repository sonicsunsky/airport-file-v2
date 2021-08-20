import request from "@/utils/request";

export const getUserAuth = data => {
  // 返回值 code=100调用成功，其它值失败。登录成功返回用户基本信息及登录令牌。
  // 用户类型说明(领导:LEADER,维修员:SERVICEMAN,治安巡视员:POLICE,消防巡视员:FIREMEN,监察员:MONITOR,值班保障:DUTY)
  // 登录令牌在后续请求中放在header中(authorization:token)
  //username:用户名,必填
  //password:密码,必填,
  //code:临时登录凭证,微信绑定必填
  //appid:应用识别码
  //platform:平台类型：wechat_small_app 微信小程序, ali_small_app 阿里系列小程序 h5_app H5应用
  return request({
    url: "/auth",
    method: "post",
    data
  });
};
