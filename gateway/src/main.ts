import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";
import { INestApplication } from "@nestjs/common";

const initializeSwagger = (app: INestApplication) => {
  const swaggerOption = new DocumentBuilder()
    .setTitle("Microservice TCP Connection")
    .setDescription(
      "This is sample of implementing microservice pattern with tcp connection"
    )
    .setVersion("1.0.0")
    .addBearerAuth({
      type: "http",
      in: "header",
      name: "Authorization",
      scheme: "bearer",
      bearerFormat: "bearer",
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup("/doc", app, document);
};

const initializeApp = async () => {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("APP_PORT");

  initializeSwagger(app);

  app.listen(port, () => {
    console.log(`the gateway service is running: http://localhost:${port}`);
  });
};

initializeApp();
