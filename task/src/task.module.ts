import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./task.schema";
import { TaskService } from "./task.service";
import { TaskMessageController } from "./task.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.get<string>("APP_DB"),
        uri: configService.get<string>("APP_URI"),
        auth: {
          username: configService.get<string>("APP_DB_USERNAME"),
          password: configService.get<string>("APP_DB_PASSWORD"),
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [TaskService],
  controllers: [TaskMessageController],
})
export class TaskModule {}
