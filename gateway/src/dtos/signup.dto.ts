import { ApiProperty } from "@nestjs/swagger";

export class SignupDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
