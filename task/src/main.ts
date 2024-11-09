import { NestFactory } from "@nestjs/core";
import { TcpOptions, Transport } from "@nestjs/microservices";
import { TaskModule } from "./task.module";

const initializeApp = async () => {
  const port = Number(process.env.APP_PORT);
  const appOption: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port,
    },
  };
  const app = await NestFactory.createMicroservice(TaskModule, appOption);
  await app.listen();
  console.log(`the task service is running: http://localhost:${port}`);
};

initializeApp();
