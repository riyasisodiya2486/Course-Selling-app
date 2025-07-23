import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthPayload {
  userId: string;
  username: string;
}

export function userMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        res.status(401).json({
            msg: "auth authHeader is missing"
        })
        return;
    }

     try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

        if (!decoded || !decoded.username || !decoded.userId) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        (req as any).user = {
            userId: decoded.userId,
            username: decoded.username
        };

        next();

    }catch(err){
        res.json({
            err
        })
        return;
    }
}