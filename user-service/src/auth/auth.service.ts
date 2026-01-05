import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokensDto } from "./dto/refresh-token.dto";
import { StringValue } from "ms";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const accessExpires =
      (process.env.JWT_ACCESS_EXPIRES as StringValue) || "15m";

    const refreshExpires =
      (process.env.JWT_REFRESH_EXPIRES as StringValue) || "7d";

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: accessExpires,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: refreshExpires,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string | null
  ) {
    await this.usersService.updateRefreshToken(userId, refreshToken);
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassowrd = await bcrypt.hash(dto.password, 10);

    return this.usersService.create({
      ...dto,
      password: hashedPassowrd,
      confirmPassword: dto.password,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("Wrong Password!");
    }
    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const data = { tokens: tokens, user: user };
    return data;
  }

  async logout(userId: string) {
    await this.updateRefreshToken(userId, null);
    return { message: "Logged out succesfully!" };
  }

  async refreshTokens(refreshTokensDto: RefreshTokensDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshTokensDto.refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        }
      );

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException("User not found!");
      }

      if (user.refreshToken !== refreshTokensDto.refreshToken) {
        throw new UnauthorizedException("Invalid refresh token !");
      }

      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token !");
    }
  }
}
