import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { AppModule } from './app.module'
import { TransformInterceptor } from './intercepter/transform.interceptor'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { AnyExceptionFilter } from './filter/any-exception.filter'
import { HttpExceptionFilter } from './filter/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(express.json()) // For parsing application/json
  app.use(express.urlencoded({ extended: true }))
  app.use(LoggerMiddleware)
  app.useGlobalInterceptors(new TransformInterceptor())
  // 过滤处理HTTP异常
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new AnyExceptionFilter())
  await app.listen(3000)
}
bootstrap()
