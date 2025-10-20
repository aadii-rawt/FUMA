import { Request, Response } from "express";
import passport from "passport";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyLoginOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifySignupOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const passportGoogle: passport.PassportStatic;
export declare const googleAuth: any;
export declare const googleAuthCallback: (req: any, res: any, next: any) => void;
//# sourceMappingURL=authController.d.ts.map