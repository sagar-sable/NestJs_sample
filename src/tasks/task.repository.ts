import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";
import { DataSource, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";


@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const taks = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        })
        await this.save(taks);
        return taks;
    }
}

