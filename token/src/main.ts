import { NestFactory } from "@nestjs/core";
import { TokenModule } from "./token.module";
import { TcpOptions, Transport } from "@nestjs/microservices";

const initializeApp = async () => {
  const port = Number(process.env.APP_PORT);
  const appOption: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port,
    },
  };
  const app = await NestFactory.createMicroservice(TokenModule, appOption);
  await app.listen();
  console.log(`the token service is running: http://localhost:${port}`);
};

initializeApp();
