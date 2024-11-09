import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./token.schema";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { TokenMessageController } from "./token.controller";

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
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [TokenService, JwtService],
  controllers: [TokenMessageController],
})
export class TokenModule {}
