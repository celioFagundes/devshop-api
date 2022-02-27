import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { graphqlUploadExpress } from 'graphql-upload'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
