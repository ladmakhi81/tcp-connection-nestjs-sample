import { NestFactory } from "@nestjs/core";
import { TcpOptions } from "@nestjs/microservices";
import { UserModule } from "./user.module";

const initializeApp = async () => {
  const port = Number(process.env.APP_PORT);
  const appOption: TcpOptions = {
    options: {
      port,
      host: "0.0.0.0",
    },
  };
  const app = await NestFactory.createMicroservice(UserModule, appOption);
  await app.listen();
  console.log(`the user service is running: http://localhost:${port}`);
};

initializeApp();
