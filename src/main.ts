import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Advanced backend lesson')
    .setDescription('REST API docs')
    .setVersion('1.0.0')
    .addTag(`localhost:${PORT}/api/docs#`)
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  // TODO reflector best practice: https://docs.nestjs.com/security/authentication#enable-authentication-globally
  // app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))  // NOTE: protect all routes with auth

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()