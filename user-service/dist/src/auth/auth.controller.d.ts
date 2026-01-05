import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokensDto } from "./dto/refresh-token.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(refreshTokensDto: RefreshTokensDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
