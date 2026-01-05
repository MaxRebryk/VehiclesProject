import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokensDto } from "./dto/refresh-token.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    private generateTokens;
    private updateRefreshToken;
    register(dto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
        refreshToken: string | null;
    }>;
    login(dto: LoginDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            createdAt: Date;
            role: import("@prisma/client").$Enums.UserRole;
            refreshToken: string | null;
        };
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    refreshTokens(refreshTokensDto: RefreshTokensDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
