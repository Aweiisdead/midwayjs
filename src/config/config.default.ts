import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { Train } from '../entity/train.entity';
import { Faults } from '../entity/faults.entity';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1724220309776_3903',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'sz11_gws',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [User, Train, Faults],
      },
    },
  },
} as MidwayConfig;
