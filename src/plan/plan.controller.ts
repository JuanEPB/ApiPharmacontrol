import { Controller, Get, Post } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('planes')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Post('seed')
  seed() {
    return this.planService.createBasePlans();
  }
}
