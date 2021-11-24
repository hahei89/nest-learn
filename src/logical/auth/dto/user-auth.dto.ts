import { SmallIntegerDataType } from 'sequelize/dist'

export class UserAuthDto {
  passwd: string
  salt: string
  username: string
  userId: SmallIntegerDataType
  realName: string
  role: string
}
