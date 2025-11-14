"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmaciaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_farmacia_dto_1 = require("./create-farmacia.dto");
class UpdateFarmaciaDto extends (0, mapped_types_1.PartialType)(create_farmacia_dto_1.CreateFarmaciaDto) {
}
exports.UpdateFarmaciaDto = UpdateFarmaciaDto;
//# sourceMappingURL=update-farmacia.dto.js.map