import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Token, TokenDocument } from "./token.schema";
import { Model } from "mongoose";
import { GenerateTokenDTO } from "./dtos/generate-token.dto";
import { VerifyTokenDTO } from "./dtos/verify-token.dto";
import { DestroyTokenDTO } from "./dtos/destory-token.dto";
import { JwtService } from "@nestjs/jwt";
import { IMessageResponse } from "./interfaces/message-response.interface";

@Injectable()
export class TokenService {
  private static SECRET_KEY: string = "xxx";

  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService
  ) {}

  async generateToken({ userId }: GenerateTokenDTO): Promise<IMessageResponse> {
    const tokenCode = this.jwtService.sign(
      { userId },
      {
        secret: TokenService.SECRET_KEY,
        expiresIn: "24h",
      }
    );
    const token = await this.tokenModel.create({ code: tokenCode, userId });
    return {
      error: false,
      message: "token created successfully",
      status: HttpStatus.OK,
      data: { token: token?.code },
    };
  }

  async verifyToken({
    token: tokenCode,
  }: VerifyTokenDTO): Promise<IMessageResponse> {
    const verifiedToken = await this.jwtService.verify(tokenCode, {
      secret: TokenService.SECRET_KEY,
    });
    if (!verifiedToken) {
      return {
        error: true,
        message: "token is not verified, you must login again",
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    const token = await this.tokenModel.findOne({
      userId: verifiedToken.userId,
      code: tokenCode,
    });
    if (!token) {
      return {
        error: true,
        message: "token is not found",
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    return {
      error: false,
      message: "token verified successfully",
      status: HttpStatus.OK,
      data: { userId: verifiedToken.userId },
    };
  }

  async destroyToken({ userId }: DestroyTokenDTO): Promise<IMessageResponse> {
    try {
      await this.tokenModel.deleteMany({ userId });
      return {
        error: false,
        message: "token deleted successfully",
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message ?? "something went wrong !!!",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
