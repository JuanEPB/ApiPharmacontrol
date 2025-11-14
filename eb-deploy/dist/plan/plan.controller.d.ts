import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    findAll(): Promise<import("./entities/plan.entity").Plan[]>;
    seed(): Promise<import("./entities/plan.entity").Plan[]>;
}
