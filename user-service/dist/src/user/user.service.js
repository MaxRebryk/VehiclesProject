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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_service_1 = require("../../prisma/prisma.service");
const rabbitMq_service_1 = require("../../rabbit-mq/rabbitMq.service");
let UserService = class UserService {
    rabbit;
    prisma;
    logger;
    constructor(rabbit, prisma, logger) {
        this.rabbit = rabbit;
        this.prisma = prisma;
        this.logger = logger;
    }
    async publishUserCreated(user) {
        try {
            const channel = this.rabbit.getChannel();
            if (!channel) {
                this.logger.warn("RabbitMQ channel not available, skipping message publish");
                return;
            }
            const message = {
                event: "user.created",
                data: { id: user.id },
            };
            const published = channel.publish("user.events", "user.created", Buffer.from(JSON.stringify(message)), { persistent: true });
            if (published) {
                this.logger.log(`Published user.created event for user ${user.id}: ${JSON.stringify(message)}`);
            }
            else {
                this.logger.warn(`Failed to publish user.created event for user ${user.id} - channel buffer full`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to publish user.created event: ${error.message}`, error.stack);
        }
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async create(createUserDto) {
        const { confirmPassword, ...data } = createUserDto;
        const user = await this.prisma.user.create({
            data,
        });
        await this.publishUserCreated(user);
        return user;
    }
    update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    updateRefreshToken(id, refreshToken) {
        return this.prisma.user.update({
            where: { id },
            data: { refreshToken },
        });
    }
    remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rabbitMq_service_1.RabbitMqService,
        prisma_service_1.PrismaService,
        nestjs_pino_1.Logger])
], UserService);
//# sourceMappingURL=user.service.js.map