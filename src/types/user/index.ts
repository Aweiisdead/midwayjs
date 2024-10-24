export interface userInfo {
  id: number;
  //用户名
  username: string;
  //密码
  password: string;
  //姓名
  name: string;
  //联系方式
  phone: string;
  //行别
  gender: number;
  //创建时间
  create_time: Date;
  //token
  token: string;
}
export interface loginForm {
  userName: string;
  password: string;
}
