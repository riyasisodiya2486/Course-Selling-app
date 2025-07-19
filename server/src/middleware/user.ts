import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function userMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        res.status(401).json({
            msg: "auth authHeader is missing"
        })
        return;
    }

    try{
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, JWT_SECRET) as {username: string};

        if(decode && decode.username){
            const username = decode.username;
            next();   
        }
        else{
            res.status(401).json({
                msg: "unauthorized user"
            })
            return;
        }
    }catch(err){
        res.json({
            err
        })
        return;
    }
}