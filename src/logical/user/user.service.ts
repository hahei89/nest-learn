import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    // if (username === 'Kid') {
    //   return 'Kid is here';
    // }
    // return 'No one here';

    const sql = `
      select user_id,account_name, real_name realName, role
      from admin_user
      where
      account_name = '${username}'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true,
      });
      const user = res[0];
      if (user) {
        return {
          code: 200,
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
