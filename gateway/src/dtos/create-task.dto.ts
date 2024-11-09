import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
