import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Auth } from "src/decorators/auth.decorator";
import { CreateTaskDTO } from "src/dtos/create-task.dto";
import { TaskService } from "src/services/task.service";

@Controller("/api/tasks")
@ApiTags("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth()
  createTask(@Body() dto: CreateTaskDTO, @Req() req: Request) {
    return this.taskService.createTask(dto, req.user._id);
  }

  @Get()
  @Auth()
  getTasks(@Req() req: Request) {
    return this.taskService.getTasks(req.user._id);
  }
}
