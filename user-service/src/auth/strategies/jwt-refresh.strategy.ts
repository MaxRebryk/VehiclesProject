import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(private readonly userService: UserService) {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error("JWT_REFRESH_SECRET is not defined in env file");
    }
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is missing!");
    }
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User not Found!");
    }
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException("Invalid refresh roken !");
    }
    return {
      sub: payload.sub,
      role: payload.role,
      email: payload.email,
      refreshToken,
    };
  }
}
