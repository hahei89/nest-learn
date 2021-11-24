import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from 'src/utils/cryptogram'
import { UserAuthDto } from './dto/user-auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(user: UserAuthDto, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息')
    if (user) {
      const hashedPassword = user.passwd
      const salt = user.salt
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt)
      if (hashedPassword === hashPassword) {
        return {
          code: 1,
          user
        }
      } else {
        return {
          code: 2,
          user: null
        }
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null
    }
  }
  // JWT验证 - Step 3: 处理jwt验证
  async certificate(user: UserAuthDto) {
    const payload = {
      username: user.username,
      sub: user.userId,
      realName: user.realName,
      role: user.role
    }
    console.log('JWT验证 - Step 3: 处理jwt验证')
    try {
      const token = this.jwtService.sign(payload)
      return {
        code: 200,
        data: {
          token
        },
        msg: '登录成功'
      }
    } catch (error) {
      return {
        code: 600,
        msg: '账号或密码错误'
      }
    }
  }
}
