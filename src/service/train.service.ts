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
    let time = new Date();
    let params = { ...data, create_time: time };
    try {
      await this.trainModel.save(params);
      return {
        code: 200,
        message: '添加成功',
        success: true,
      };
    } catch (error) {
      throw new CustomError(error, 500);
    }
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
    let result: any = {};
    let time = new Date();
    params.update_time = time;
    try {
      result = await this.trainModel
        .createQueryBuilder()
        .where({ id: params.id })
        .update(params)
        .execute();
      if (result.affected > 0) {
        return {
          code: 200,
          data: result,
          success: result.affected > 0,
        };
      } else {
        throw new CustomError('修改失败', 500);
      }
    } catch (error) {
      throw new CustomError(error, 500);
    }
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
