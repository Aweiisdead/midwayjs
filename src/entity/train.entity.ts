import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('train')
export class Train {
  @PrimaryColumn()
  id: number;
  //车号
  @Column()
  train_name: string;
  //密码
  @Column()
  line_id: number;
  //编组
  @Column()
  marshalling: string;
  //车辆状态
  @Column()
  status: string;
  //创建时间
  @Column()
  create_time: Date;
  //更新
  @Column()
  update_time: Date;
  //生产日期
  @Column()
  factory_date: Date;
  //生产日期
  @Column()
  last_fixed_date: Date;
}
