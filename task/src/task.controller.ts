import { Controller } from "@nestjs/common";
import { TaskService } from "./task.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateTaskDTO } from "./dtos/create-task.dto";
import { GetTasksByUserIdDTO } from "./dtos/get-tasks-by-user-id.dto";

@Controller()
export class TaskMessageController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern("task.create_task")
  createTask(data: CreateTaskDTO) {
    return this.taskService.createTask(data);
  }

  @MessagePattern("task.get_task_by_user_id")
  getTasksByUserId(data: GetTasksByUserIdDTO) {
    return this.taskService.getTaskByUserId(data);
  }
}
