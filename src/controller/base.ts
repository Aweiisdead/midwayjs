import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result, IResult } from '../utils';
import { BaseService } from '../service/base';

@Provide()
export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  service: BaseService;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }

  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }
}
