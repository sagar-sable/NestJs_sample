"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTaskById(id, user) {
        try {
            const found = await this.taskRepository.findOne({ where: { id, user } });
            console.log(found);
            if (!found) {
                throw new common_1.NotFoundException("Task not found");
            }
            return found;
        }
        catch (e) {
            throw new common_1.NotFoundException("Task not found");
        }
    }
    createTask(createTaskDto, user) {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async deleteTaskById(id, user) {
        try {
            const result = await this.taskRepository.delete({ id, user });
            if (result.affected === 0) {
                throw new common_1.NotFoundException("Task not found");
            }
        }
        catch (e) {
            throw new common_1.NotFoundException("Task not found");
        }
    }
    async getAllTasks(filterDto, user) {
        return this.taskRepository.getTasks(filterDto, user);
    }
    async updateTaskStatus(id, staus, user) {
        const task = await this.getTaskById(id, user);
        task.status = staus;
        await this.taskRepository.save(task);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map