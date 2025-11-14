"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmaciaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const farmacia_entity_1 = require("./entities/farmacia.entity");
const empresa_entity_1 = require("../empresa/entities/empresa.entity");
const farmacia_service_1 = require("./farmacia.service");
const farmacia_controller_1 = require("./farmacia.controller");
const plan_entity_1 = require("../plan/entities/plan.entity");
const plan_module_1 = require("../plan/plan.module");
let FarmaciaModule = class FarmaciaModule {
};
exports.FarmaciaModule = FarmaciaModule;
exports.FarmaciaModule = FarmaciaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([farmacia_entity_1.Farmacia, empresa_entity_1.Empresa, plan_entity_1.Plan]), plan_module_1.PlanModule],
        controllers: [farmacia_controller_1.FarmaciaController],
        providers: [farmacia_service_1.FarmaciaService],
        exports: [farmacia_service_1.FarmaciaService],
    })
], FarmaciaModule);
//# sourceMappingURL=farmacia.module.js.map