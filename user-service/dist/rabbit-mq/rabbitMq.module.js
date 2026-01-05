"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqModule = void 0;
const common_1 = require("@nestjs/common");
const rabbitMq_service_1 = require("./rabbitMq.service");
let RabbitMqModule = class RabbitMqModule {
};
exports.RabbitMqModule = RabbitMqModule;
exports.RabbitMqModule = RabbitMqModule = __decorate([
    (0, common_1.Module)({
        providers: [rabbitMq_service_1.RabbitMqService],
        exports: [rabbitMq_service_1.RabbitMqService],
    })
], RabbitMqModule);
//# sourceMappingURL=rabbitMq.module.js.map