import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { LoginDTO } from "src/dtos/login.dto";
import { SignupDTO } from "src/dtos/signup.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_SERVICE") private readonly userClientService: ClientProxy,
    @Inject("TOKEN_SERVICE") private readonly tokenClientService: ClientProxy
  ) {}

  async signup(dto: SignupDTO) {
    const createUserResponse = await firstValueFrom(
      this.userClientService.send("user.user_signup", dto)
    );
    if (createUserResponse.error) {
      throw new HttpException(
        createUserResponse.message,
        createUserResponse.status
      );
    }
    const generateTokenResponse = await firstValueFrom(
      this.tokenClientService.send(
        "token.generate_token",
        createUserResponse.data
      )
    );
    if (generateTokenResponse.error) {
      throw new HttpException(
        generateTokenResponse.message,
        generateTokenResponse.status
      );
    }
    return { token: generateTokenResponse.data?.token };
  }

  async login(dto: LoginDTO) {
    const loginResponse = await firstValueFrom(
      this.userClientService.send("user.user_login", dto)
    );
    if (loginResponse.error) {
      throw new HttpException(loginResponse.message, loginResponse.status);
    }
    const generateTokenResponse = await firstValueFrom(
      this.tokenClientService.send("token.generate_token", loginResponse?.data)
    );
    if (generateTokenResponse.error) {
      throw new HttpException(
        generateTokenResponse.message,
        generateTokenResponse.status
      );
    }
    return { token: generateTokenResponse?.data?.token };
  }

  async logout(userId: string) {
    const findUserByIdResponse = await firstValueFrom(
      this.userClientService.send("user.user_find_by_id", { id: userId })
    );
    if (findUserByIdResponse.error) {
      throw new HttpException(
        findUserByIdResponse.message,
        findUserByIdResponse.status
      );
    }
    const destoryTokenResponse = await firstValueFrom(
      this.tokenClientService.send("token.destroy_token", { userId })
    );
    if (destoryTokenResponse.error) {
      throw new HttpException(
        destoryTokenResponse.message,
        destoryTokenResponse.status
      );
    }
    return { message: destoryTokenResponse.message };
  }

  async getProfile(userId: string) {
    const findUserByIdResponse = await firstValueFrom(
      this.userClientService.send("user.user_find_by_id", { id: userId })
    );
    if (findUserByIdResponse?.error) {
      throw new HttpException(
        findUserByIdResponse?.message,
        findUserByIdResponse?.status
      );
    }
    return { user: findUserByIdResponse?.data?.user };
  }
}
