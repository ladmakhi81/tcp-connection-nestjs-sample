import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { GenerateTokenDTO } from "./dtos/generate-token.dto";
import { TokenService } from "./token.service";
import { VerifyTokenDTO } from "./dtos/verify-token.dto";
import { DestroyTokenDTO } from "./dtos/destory-token.dto";

@Controller()
export class TokenMessageController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern("token.generate_token")
  generateToken(data: GenerateTokenDTO) {
    return this.tokenService.generateToken(data);
  }

  @MessagePattern("token.verify_token")
  verifyToken(data: VerifyTokenDTO) {
    return this.tokenService.verifyToken(data);
  }

  @MessagePattern("token.destroy_token")
  destroyToken(data: DestroyTokenDTO) {
    return this.tokenService.destroyToken(data);
  }
}
