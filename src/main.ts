import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // API prefix
  app.setGlobalPrefix("api")

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Sư đoàn 375 API")
    .setDescription("API documentation for Sư đoàn phòng không 375 website")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  const port = process.env.PORT || 3001
  await app.listen(port)

  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`)
}

bootstrap()
