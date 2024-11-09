import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { UserMessageController } from "./user.controller";

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
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserMessageController],
})
export class UserModule {}
