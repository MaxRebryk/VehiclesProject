import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Logger } from "nestjs-pino";
import { PrismaService } from "../../prisma/prisma.service";
import { RabbitMqService } from "rabbit-mq/rabbitMq.service";
export declare class UserService {
    private readonly rabbit;
    private readonly prisma;
    private readonly logger;
    constructor(rabbit: RabbitMqService, prisma: PrismaService, logger: Logger);
    private publishUserCreated;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }[]>;
    findByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateRefreshToken(id: string, refreshToken: string | null): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
