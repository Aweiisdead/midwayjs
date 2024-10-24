import { Controller, Get, Inject } from '@midwayjs/core';
import { FaultsService } from '../service/faults.service';
import { ApiOperation } from '@midwayjs/swagger';
@Controller('/fault')
export class TrainController {
  @Inject()
  faultsService: FaultsService;
  @ApiOperation({ summary: '获取病害列表' })
  @Get('/list')
  async list(): Promise<any> {
    return this.faultsService.getList();
  }
  @Get('/alarmTrend')
  @ApiOperation({ summary: '获取缺陷统计' })
  async alarmTrend(): Promise<any> {
    return this.faultsService.getCount();
  }
}
