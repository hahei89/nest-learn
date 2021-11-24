import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './logical/user/user.module'
import { AuthService } from './logical/auth/auth.service'
import { AuthModule } from './logical/auth/auth.module'

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
