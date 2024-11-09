import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Auth } from "src/decorators/auth.decorator";
import { LoginDTO } from "src/dtos/login.dto";
import { SignupDTO } from "src/dtos/signup.dto";
import { UserService } from "src/services/user.service";

@Controller("/api/users")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  signup(@Body() dto: SignupDTO) {
    return this.userService.signup(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDTO) {
    return this.userService.login(dto);
  }

  @Get("logout")
  @Auth()
  logout(@Req() req: Request) {
    return this.userService.logout(req.user._id);
  }

  @Get("profile")
  @Auth()
  getProfile(@Req() req: Request) {
    return this.userService.getProfile(req.user._id);
  }
}
