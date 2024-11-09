import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";
import { tokenServiceProvider } from "./providers/token-service.provider";
import { userServiceProvider } from "./providers/user-service.provider";
import { taskServiceProvider } from "./providers/task-service.provider";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [TaskController, UserController],
  providers: [
    TaskService,
    UserService,
    tokenServiceProvider,
    userServiceProvider,
    taskServiceProvider,
  ],
})
export class GatewayModule {}
