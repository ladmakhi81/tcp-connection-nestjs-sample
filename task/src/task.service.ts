import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dtos/create-task.dto";
import { GetTasksByUserIdDTO } from "./dtos/get-tasks-by-user-id.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.schema";
import { Model } from "mongoose";
import { IMessageResponse } from "./interfaces/message-response.interface";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>
  ) {}

  async createTask({
    content,
    title,
    userId,
  }: CreateTaskDTO): Promise<IMessageResponse> {
    const duplicatedTitle = await this.taskModel.findOne({ title });
    if (duplicatedTitle) {
      return {
        error: true,
        message: "task exist with this title",
        status: HttpStatus.CONFLICT,
      };
    }

    const task = await this.taskModel.create({
      title,
      content,
      userId,
    });

    return {
      error: false,
      message: "task is created successfully",
      status: HttpStatus.CREATED,
      data: { task },
    };
  }

  async getTaskByUserId({
    userId,
  }: GetTasksByUserIdDTO): Promise<IMessageResponse> {
    const tasks = await this.taskModel.find({ userId });
    return {
      error: false,
      message: "return all lists of tasks related to this user id",
      status: HttpStatus.OK,
      data: { tasks },
    };
  }
}
