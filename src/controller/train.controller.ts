import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Body,
  Del,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TrainService } from '../service/train.service';
import { ApiOperation } from '@midwayjs/swagger';
@Controller('/train')
export class TrainController {
  @Inject()
  trainService: TrainService;
  @Inject()
  ctx: Context;
  @ApiOperation({ summary: '获取列车列表' })
  @Get('/list')
  async list(@Query('status') status: string): Promise<any> {
    return this.trainService.getTrainList({
      status,
    });
  }
  @ApiOperation({ summary: '添加列车' })
  @Post('/add')
  async add(@Body() data: any): Promise<any> {
    return this.trainService.addTrain(data);
  }
  @ApiOperation({ summary: '删除列车' })
  @Del('/delete')
  async delete(@Query('id') id: string | number): Promise<any> {
    return this.trainService.delTrain(id);
  }
  @ApiOperation({ summary: '修改列车' })
  @Put('/update')
  async update(@Body() data: any): Promise<any> {
    return this.trainService.updateTrain(data);
  }
  @Get('/page')
  async page(@Query() query) {
    return this.trainService.gtTrainPage(query);
  }
}
