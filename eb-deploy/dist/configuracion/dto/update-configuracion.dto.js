"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfiguracionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_configuracion_dto_1 = require("./create-configuracion.dto");
class UpdateConfiguracionDto extends (0, mapped_types_1.PartialType)(create_configuracion_dto_1.CreateConfiguracionDto) {
}
exports.UpdateConfiguracionDto = UpdateConfiguracionDto;
//# sourceMappingURL=update-configuracion.dto.js.map