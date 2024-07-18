import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskDto } from './task.dto';

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
}
