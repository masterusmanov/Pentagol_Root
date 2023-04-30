import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 
 const PORT = process.env.API_PORT;
 app.use(cookieParser());
 app.useGlobalPipes(new ValidationPipe());
 app.setGlobalPrefix('api');
 app.use((req, res, next) => {
   const startTime = Date.now();
   res.on('finish', () => {
     const endTime = Date.now();
     const responseTime = endTime - startTime;
     console.log(
       `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`,
     );
   });
   next();
 });

 const config = new DocumentBuilder()
  .setTitle('NestJS TEST')
  .setDescription('REST API')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgres, Sequalize')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>{
    console.log(`${PORT}th port is running`);
  });
}
bootstrap();
