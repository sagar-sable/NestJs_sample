import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTaskById(id: string): Promise<void>;
    getAllTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    updateTaskStatus(id: string, staus: TaskStatus): Promise<Task>;
}
