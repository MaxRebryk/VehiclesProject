import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Logger } from "nestjs-pino";
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService, logger: Logger);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateUserDto: UpdateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
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
