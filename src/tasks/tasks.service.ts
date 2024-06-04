import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { use } from 'passport';

@Injectable()
export class TasksService {

    constructor(private readonly taskRepository: TaskRepository) { }

    async getTaskById(id: string, user: User): Promise<Task> {
        try {
            const found = await this.taskRepository.findOne({ where: { id, user } });
            console.log(found);
            if (!found) {
                throw new NotFoundException("Task not found");
            }
            return found;
        } catch (e) {
            throw new NotFoundException("Task not found");
        }
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(id: string, user: User): Promise<void> {
        try {
            const result = await this.taskRepository.delete({ id, user });
            if (result.affected === 0) {
                throw new NotFoundException("Task not found");
            }
        } catch (e) {
            throw new NotFoundException("Task not found");
        }
    }

    async getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async updateTaskStatus(id: string, staus: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = staus;
        await this.taskRepository.save(task);
        return task;
    }


}
