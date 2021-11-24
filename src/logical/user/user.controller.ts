import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from '../auth/auth.service'
import { AuthGuard } from '@nestjs/passport'
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async findOne(@Body() loginParams: any) {
    console.log('JWT验证: Step1: 用户请求登录')
    const user = await this.usersService.findOne(loginParams.username)
    const authResult = await this.authService.validateUser(
      user,
      loginParams.password
    )
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 600,
          msg: '账号或密码错误'
        }
      default:
        return {
          code: 600,
          msg: '查无此人'
        }
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.usersService.register(body)
  }
}
