import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  createTask(task: TaskDto) {
    this.tasks.push(task);
  }

  findTaskById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
    //throw new NotFoundException(`Task with id ${id} not found`);
  }

  findAllTasks(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  updateTask(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  deleteTask(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
