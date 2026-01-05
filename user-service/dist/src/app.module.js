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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("../prisma/prisma.module");
const nestjs_pino_1 = require("nestjs-pino");
const auth_module_1 = require("../src/auth/auth.module");
const rabbitMq_module_1 = require("../rabbit-mq/rabbitMq.module");
const rabbitMq_service_1 = require("../rabbit-mq/rabbitMq.service");
let AppModule = AppModule_1 = class AppModule {
    rabbit;
    logger = new common_1.Logger(AppModule_1.name);
    constructor(rabbit) {
        this.rabbit = rabbit;
    }
    async onModuleInit() {
        try {
            await this.rabbit.connect();
            this.logger.log("Successfully connected to RabbitMQ");
        }
        catch (error) {
            this.logger.error(`Failed to connect to RabbitMQ: ${error.message}`, error.stack);
            this.logger.warn("Application will continue without RabbitMQ. Make sure RabbitMQ is running for message queue functionality.");
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            rabbitMq_module_1.RabbitMqModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: "pino-pretty",
                        options: {
                            colorize: true,
                            translateTime: "HH:MM:ss Z",
                            ignore: "pid,hostname",
                        },
                    },
                },
            }),
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [rabbitMq_service_1.RabbitMqService])
], AppModule);
//# sourceMappingURL=app.module.js.map