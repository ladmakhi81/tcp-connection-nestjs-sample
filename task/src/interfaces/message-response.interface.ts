import { HttpStatus } from "@nestjs/common";

export interface IMessageResponse {
  status: HttpStatus;
  error: boolean;
  message: string;
  data?: Record<string, any>;
}
