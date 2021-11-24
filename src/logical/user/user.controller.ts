import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterDto } from './dto/register.dto'
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username)
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.usersService.register(body)
  }
}
