import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { firstValueFrom } from "rxjs";

export class AuthGuard implements CanActivate {
  constructor(
    @Inject("TOKEN_SERVICE") private readonly tokenService: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.header("Authorization");
    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer?.toLowerCase() !== "bearer") {
      throw new UnauthorizedException();
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    const verifyTokenResponse = await firstValueFrom(
      this.tokenService.send("token.verify_token", { token })
    );
    if (verifyTokenResponse?.error) {
      throw new HttpException(
        verifyTokenResponse?.message,
        verifyTokenResponse?.status
      );
    }
    const findUserByIdResponse = await firstValueFrom(
      this.userService.send("user.user_find_by_id", {
        id: verifyTokenResponse?.data?.userId,
      })
    );
    if (findUserByIdResponse?.error) {
      throw new HttpException(
        findUserByIdResponse?.message,
        findUserByIdResponse?.status
      );
    }
    request.user = findUserByIdResponse?.data?.user;
    return true;
  }
}
