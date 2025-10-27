import { Request, Response } from "express";
export declare const getAutomation: (req: Request, res: Response) => Promise<void>;
export declare const createAutomation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAutomation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const stopAutomation: (req: Request, res: Response) => Promise<void>;
export declare const automationCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const linkRedirect: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=automationController.d.ts.map