import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  createTask(@Body() task: TaskDto) {
    this.taskService.createTask(task);
    return 'Task created successfully';
  }

  @Get('/:id')
  findTaskById(@Param('id') id: string): TaskDto {
    return this.taskService.findTaskById(id);
  }

  @Put()
  updateTask(@Body() task: TaskDto) {
    this.taskService.updateTask(task);
  }
}
