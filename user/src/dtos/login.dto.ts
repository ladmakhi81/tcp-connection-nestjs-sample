import { SignupDTO } from "./signup.dto";

export type LoginDTO = Omit<SignupDTO, "name">;
