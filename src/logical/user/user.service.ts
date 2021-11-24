import { Injectable } from '@nestjs/common'
import * as Sequelize from 'sequelize'
import { encryptPassword, makeSalt } from 'src/utils/cryptogram'
import sequelize from '../../database/sequelize'
import { RegisterDto } from './dto/register.dto'
@Injectable()
export class UserService {
  /**
   * 查找是否有该用户
   * @param username 用户名
   * @returns 是否查找成功
   */
  async findOne(username: string): Promise<any | undefined> {
    // if (username === 'Kid') {
    //   return 'Kid is here';
    // }
    // return 'No one here';

    const sql = `
      select 
      user_id,account_name, 
      real_name realName, 
      role,
      passwd_salt salt,
      passwd
      from admin_user
      where
      account_name = '${username}'
    `
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true
      })
      const user = res[0]
      return user
    } catch (error) {
      return void 0
    }
  }
  /**
   * 注册用户
   * @param requestBody 请求体
   * @returns 成功或失败
   */
  async register(requestBody: RegisterDto): Promise<any> {
    const { accountName, realName, password, mobile } = requestBody
    const user = await this.findOne(accountName)
    if (user) {
      return {
        code: 400,
        msg: '用户已存在'
      }
    }

    const salt = makeSalt()
    const hashPwd = encryptPassword(password, salt)
    const registerSQL = `
      insert into admin_user
      (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      values
      ('${accountName}', '${realName}', '${hashPwd}', '${salt}','${mobile}', 1, 3, 0)
    `
    try {
      await sequelize.query(registerSQL, { logging: false })
      return {
        code: 200,
        msg: 'Success'
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`
      }
    }
  }
}
