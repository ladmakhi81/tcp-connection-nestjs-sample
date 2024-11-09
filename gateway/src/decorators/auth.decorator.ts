import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";

export const Auth = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
};
