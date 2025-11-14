import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
export declare class PlanService {
    private readonly planRepo;
    constructor(planRepo: Repository<Plan>);
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan | null>;
    createBasePlans(): Promise<Plan[]>;
}
