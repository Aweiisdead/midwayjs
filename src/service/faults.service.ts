import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from './base';
import { Faults } from '../entity/faults.entity';
import { CustomError } from '../utils/customError';
@Provide()
export class FaultsService extends BaseService {
  @InjectEntityModel(Faults)
  faultsModel: Repository<Faults>;
  async getList() {
    let result = {};
    try {
      result = await this.faultsModel
        .createQueryBuilder()
        .orderBy('create_time', 'DESC')
        .getMany();
      return {
        code: 200,
        data: result,
        success: true,
      };
    } catch (e) {
      throw new CustomError(e, 500);
    }
  }
  async getCount() {
    let result = {};
    try {
      result = await this.faultsModel
        .createQueryBuilder('party_sign_in')
        .select('COUNT(*) count')
        .where({ belong_sys: 2 })
        .andWhere('month(create_time)=month(NOW())')
        .getRawOne();
      // .createQueryBuilder()
      // .where('faults.belong_sys = :belong_sys', {
      //   belong_sys: 1,
      // })
      // .getCount();
      //   console.log(result);
      return {
        code: 200,
        data: result,
        success: true,
      };
    } catch (e) {
      throw new CustomError(e, 500);
    }
  }
}
