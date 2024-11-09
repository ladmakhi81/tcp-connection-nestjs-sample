import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SignupDTO } from "./dtos/signup.dto";
import { LoginDTO } from "./dtos/login.dto";
import { UserService } from "./user.service";
import { FindByIdDTO } from "./dtos/find-by-id.dto";

@Controller()
export class UserMessageController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("user.user_signup")
  async signup(data: SignupDTO) {
    return this.userService.signup(data);
  }

  @MessagePattern("user.user_login")
  async login(data: LoginDTO) {
    return this.userService.login(data);
  }

  @MessagePattern("user.user_find_by_id")
  async findById(data: FindByIdDTO) {
    return this.userService.findById(data);
  }
}
