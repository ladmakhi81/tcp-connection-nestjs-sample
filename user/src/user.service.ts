import { HttpStatus, Injectable } from "@nestjs/common";
import { SignupDTO } from "./dtos/signup.dto";
import { LoginDTO } from "./dtos/login.dto";
import { IMessageResponse } from "./interfaces/message-response.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { FindByIdDTO } from "./dtos/find-by-id.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async signup({
    email,
    name,
    password,
  }: SignupDTO): Promise<IMessageResponse> {
    const checkEmailDuplicated = await this.userModel.findOne({ email });
    if (checkEmailDuplicated) {
      return {
        error: true,
        message: "user duplicated by email address",
        status: HttpStatus.CONFLICT,
      };
    }
    const passwordSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return {
      error: false,
      message: "user signed up successfully",
      status: HttpStatus.CREATED,
      data: { userId: user._id },
    };
  }

  async login({ email, password }: LoginDTO): Promise<IMessageResponse> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return {
        error: true,
        message: "email or password is incorrect",
        status: HttpStatus.NOT_FOUND,
      };
    }
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) {
      return {
        error: true,
        message: "email or password is incorrect",
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      error: false,
      message: "user logged in successfully",
      status: HttpStatus.OK,
      data: { userId: user._id },
    };
  }

  async findById({ id }: FindByIdDTO): Promise<IMessageResponse> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      return {
        error: true,
        message: "user not found by id",
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      error: false,
      message: "user find successfully",
      status: HttpStatus.OK,
      data: { user },
    };
  }
}
