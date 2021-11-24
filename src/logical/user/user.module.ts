import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [],
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
