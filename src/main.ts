import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import { Request, Response, NextFunction } from 'express';
import { ValidationPipe } from '@nestjs/common';

/** 
  The main entry point of the application. 
 It initializes the NestJS application, sets up global configurations, 
 and starts the server.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
    Sets up global validation using `ValidationPipe`.
     `whitelist: true` removes properties that do not have validation decorators.
     `forbidNonWhitelisted: true` throws an error if non-whitelisted properties are found.
     `transform: true` enables automatic transformation of input data.
    -`enableImplicitConversion: true` allows automatic type conversion.
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  /**Swagger Configuration */
  const config = new DocumentBuilder()
    .setTitle('REAL TIME CHAT - Chat-app-api')
    .setDescription('Use the base Api URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

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

  // app.useGlobalInterceptors(new DataResponseInterceptor)

  // enable cors
  app.enableCors({
    origin: '*', // All locations
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /**
    Sets custom security headers to prevent COOP issues.
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
