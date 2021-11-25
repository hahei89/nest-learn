import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CommodityService } from './commodity.service'
import { RbacInterceptor } from '../../interceptor/rbac.interceptor'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  // 查询商品列表
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(3)) // 调用RBAC拦截器
  @Post('list')
  async queryCommonList(@Body() body: any) {
    return await this.commodityService.queryCommandList(body)
  }

  // 新建商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(2))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.createCommodity(body, req.user.username)
  }

  // 修改商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(2))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username)
  }

  // 删除商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body)
  }
}
