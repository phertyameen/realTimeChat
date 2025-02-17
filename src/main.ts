import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**Swagger Configuration */
const config = new DocumentBuilder()
.setTitle('REAL TIME CHAT - Chat-app-api')
.setDescription('Use the base Api URL as http://localhost:3000')
.setTermsOfService('http://localhost:3000/terms-of-service')
.addServer('http://localhost:3000')
.setVersion('1.0')
.build()

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion: true,
    }
  }),
);


/**instantiate document */
const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
  app.enableCors()
}
bootstrap();
