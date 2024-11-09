import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateTaskDTO } from "src/dtos/create-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @Inject("TASK_SERVICE") private readonly taskServiceClient: ClientProxy,
    @Inject("USER_SERVICE") private readonly userServiceClient: ClientProxy
  ) {}

  async createTask(dto: CreateTaskDTO, userId: string) {
    const findUserByIdResponse = await firstValueFrom(
      this.userServiceClient.send("user.user_find_by_id", { id: userId })
    );
    if (findUserByIdResponse?.error) {
      throw new HttpException(
        findUserByIdResponse?.message,
        findUserByIdResponse?.status
      );
    }
    const createTaskResponse = await firstValueFrom(
      this.taskServiceClient.send("task.create_task", {
        title: dto.title,
        content: dto.content,
        userId,
      })
    );

    if (createTaskResponse?.error) {
      throw new HttpException(
        createTaskResponse?.message,
        createTaskResponse?.status
      );
    }

    return createTaskResponse?.data;
  }

  async getTasks(userId: string) {
    const findUserByIdResponse = await firstValueFrom(
      this.userServiceClient.send("user.user_find_by_id", { id: userId })
    );
    if (findUserByIdResponse?.error) {
      throw new HttpException(
        findUserByIdResponse?.message,
        findUserByIdResponse?.status
      );
    }
    const findTasksByUserId = await firstValueFrom(
      this.taskServiceClient.send("task.get_task_by_user_id", {
        userId: findUserByIdResponse?.data?.user?._id,
      })
    );
    if (findTasksByUserId?.error) {
      throw new HttpException(
        findTasksByUserId?.message,
        findTasksByUserId?.status
      );
    }
    return findTasksByUserId?.data;
  }
}
