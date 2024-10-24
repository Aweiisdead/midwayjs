import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('faults')
export class Faults {
  @PrimaryColumn()
  id: number;
  //所属类型
  @Column()
  type: string;
  //病害描述
  @Column()
  description: string;
  //病害等级
  @Column()
  level: string;
  //公里标k
  @Column()
  k: string;
  //公里标m
  @Column()
  m: string;
  //病害车号
  @Column()
  train_number: string;
  //病害车辆id
  @Column()
  train_id: string;
  //是否修复
  @Column()
  is_fixed: string;
  //发生日期
  @Column()
  create_time: string;
  //修复时间
  @Column()
  fixed_time: string;
  //行别
  @Column()
  happened_way: string;
  //所属系统
  @Column()
  belong_sys: number;
}
