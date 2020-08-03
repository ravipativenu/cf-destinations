import { Request, Response } from 'express';
export declare function dependencyCallbackRoute(req: Request, res: Response): Promise<void>;
export declare function subscribeTenantRoute(req: Request, res: Response): Promise<void>;
export declare function unsubscribeTenantRoute(req: Request, res: Response): Promise<void>;
