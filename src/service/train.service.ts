import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BaseService } from './base';
import { Train } from '../entity/train.entity';
import { CustomError } from '../utils/customError';
@Provide()
export class TrainService extends BaseService {
  @InjectEntityModel(Train)
  trainModel: Repository<Train>;
  async getTrainList(queryInfo) {
    let result = {};
    try {
      result = await this.trainModel
        .createQueryBuilder()
        // .where('train.status IN (:...status)', {
        //   status: queryInfo.status ? queryInfo.status.split(',') : [],
        // })
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
  async addTrain(data) {
    await this.trainModel.save(data).then(res => {
      return {
        code: 200,
        message: '添加成功',
        success: true,
      };
    });
  }
  async delTrain(id) {
    let result: any = {};
    try {
      result = await this.trainModel
        .createQueryBuilder()
        .delete()
        .where({
          id,
        })
        .execute();
      return {
        code: 200,
        data: result,
        success: result.affected > 0,
      };
    } catch (error) {
      throw new CustomError(error, 500);
    }
  }
  async updateTrain(params) {
    await this.trainModel.update(params.id, params).then(res => {
      return {
        code: 200,
        message: '修改成功',
        success: true,
      };
    });
  }
  async gtTrainPage(params) {
    let result = [];
    try {
      result = await this.trainModel
        .createQueryBuilder()
        .where({
          train_name: Like(`%${params.train_name}%`),
        })
        .orderBy('train_name')
        .skip(params.size * (params.page - 1)) //10 * 1
        .take(params.size) //20
        .getManyAndCount();
      return {
        data: result[0],
        total: result[1],
        size: Number(params.size),
        page: Number(params.page),
        code: 200,
        success: true,
      };
    } catch (e) {
      throw new CustomError(e, 500);
    }
  }
}
