import { SignupDTO } from "./signup.dto";
import { PickType } from "@nestjs/swagger";

export class LoginDTO extends PickType(SignupDTO, ["email", "password"]) {}
