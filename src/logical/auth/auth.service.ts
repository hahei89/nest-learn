import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from 'src/utils/cryptogram'
import { UserAuthDto } from './dto/user-auth.dto'
import { RedisInstance } from '../../database/redis'
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
      const redis = await RedisInstance.initRedis('auth.certificate', 0)
      await redis.setex(`${user.id}-${user.username}`, 300, `${token}`)
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
