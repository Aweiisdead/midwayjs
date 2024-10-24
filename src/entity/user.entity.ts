import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;
  //用户名
  @Column()
  username: string;
  //密码
  @Column()
  password: string;
  //姓名
  @Column()
  name: string;
  //联系方式
  @Column()
  phone: string;
  //性别
  @Column()
  gender: number;
  @Column()
  belong_sys: string;
  //创建时间
  @Column()
  create_time: Date;
  //更新时间
  @Column()
  update_time: Date;
}
