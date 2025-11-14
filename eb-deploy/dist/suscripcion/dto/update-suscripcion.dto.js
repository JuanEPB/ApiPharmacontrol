"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSuscripcionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_suscripcion_dto_1 = require("./create-suscripcion.dto");
class UpdateSuscripcionDto extends (0, mapped_types_1.PartialType)(create_suscripcion_dto_1.CreateSuscripcionDto) {
}
exports.UpdateSuscripcionDto = UpdateSuscripcionDto;
//# sourceMappingURL=update-suscripcion.dto.js.map