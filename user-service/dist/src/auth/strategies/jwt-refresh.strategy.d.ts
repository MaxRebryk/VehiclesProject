import { Strategy } from "passport-jwt";
import { Request } from "express";
import { UserService } from "../../user/user.service";
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(req: Request, payload: any): Promise<{
        sub: any;
        role: any;
        email: any;
        refreshToken: any;
    }>;
}
export {};
