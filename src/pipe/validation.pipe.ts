import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Logger } from '../utils/log4js'

@Injectable()
export class ValidationPipe implements PipeTransform {
  private toValidate(metatype: any) {
    const types: any[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype
    console.log('value: ', value, 'metatype: ', metatype)
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0] // 只要取第一个错误信息
      Logger.error(`Validation failed: ${msg}`)
      throw new BadRequestException(`Validation failed: ${msg}`)
    }

    return value
  }
}
