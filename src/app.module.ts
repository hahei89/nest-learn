import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './logical/user/user.module'
import { AuthModule } from './logical/auth/auth.module'
import { CommodityModule } from './logical/commodity/commodity.module'

@Module({
  imports: [UserModule, AuthModule, CommodityModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
