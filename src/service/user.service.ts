import { Provide, MidwayError } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { BaseService } from './base';
import { CustomError } from '../utils/customError';
@Provide()
export class UserService extends BaseService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  async login(loginForm) {
    let result = <any>{};
    try {
      result = await this.userModel
        .createQueryBuilder('users')
        .where({
          username: loginForm.username,
          password: loginForm.password,
        })
        .getOne();
      if (result) {
        return {
          code: 200,
          data: {
            ...result,
            token: 'Bearer kj34jkln1l5nl134opi24lkk1op236bj',
          },
          success: true,
        };
      } else {
        throw new Error('用户名或密码错误');
      }
    } catch (error) {
      throw new CustomError(error, 500);
    }

    // let result = await this.userModel
    //   .find({
    //     where: {
    //       username: loginForm.username,
    //       password: loginForm.password,
    //     },
    //   })
    //   .then(res => {
    //     let ressult = {
    //       ...res[0],
    //       token: 'Bearer kj34jkln1l5nl134opi24lkk1op236bj',
    //     };
    //     return {
    //       code: 200,
    //       data: ressult,
    //       success: true,
    //     };
    //   })
    //   .catch(rej => {
    //     return Error('用户名或密码错误');
    //   });
    // return result;
  }
  async getUserPage(queryForm) {
    let result = [];
    try {
      result = await this.userModel
        .createQueryBuilder()
        .where({
          name: Like(`%${queryForm.name}%`),
        })
        .orderBy('create_time', 'DESC')
        .skip(queryForm.size * (queryForm.page - 1)) //跳过前多少条
        .take(queryForm.size) //取多少条
        .getManyAndCount();
      return {
        data: result[0],
        total: result[1],
        size: Number(queryForm.size),
        page: Number(queryForm.page),
        code: 200,
        success: true,
      };
    } catch (e) {
      throw new MidwayError(e);
    }
  }
  async addUser(params) {
    let time = new Date();
    let newUser = params;
    newUser.create_time = time;
    try {
      await this.userModel.save(newUser);
      return {
        code: 200,
        message: '添加成功',
        success: true,
      };
    } catch (error) {
      throw new CustomError(error, 500);
    }
  }
  async updateUser(params) {
    let nowTime = new Date();
    params.update_time = nowTime;
    try {
      if (!params.username) {
        throw '请输入用户名';
      } else {
        const result = await this.userModel
          .createQueryBuilder()
          .update()
          .set(params)
          .where({ id: params.id })
          .execute();
        const { affected } = result || {};
        if (affected > 0) {
          return {
            code: 200,
            message: '修改用户成功',
            success: true,
          };
        }
      }
    } catch (e) {
      throw new CustomError(e, 500);
    }
  }
  async deleteUser(id: number) {
    let result: any = {};
    try {
      result = await this.userModel
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
}
