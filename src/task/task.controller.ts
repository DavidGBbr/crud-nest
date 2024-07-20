import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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

  @Get()
  findAll(@Query() params: FindAllParameters): TaskDto[] {
    return this.taskService.findAllTasks(params);
  }

  @Put()
  updateTask(@Body() task: TaskDto) {
    this.taskService.updateTask(task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
