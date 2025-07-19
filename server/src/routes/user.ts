//User router
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import {UserSignin, UserSchema, CourseSchema} from "../utils/types";
import { User, Course} from "../models/db";
import { userMiddleware } from "../middleware/user";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string; 

router.post('/signup', async(req, res)=>{
    const createPayload = req.body;
    const parsedPayload = UserSchema.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(403).json({
            msg: "invalid inputs"
        })
        return;
    }    
    const user = await User.findOne({
        username: createPayload.username
    })

    const hashedPassword = await bcrypt.hash(createPayload.password, 10);

    if(user){
        res.status(404).json({
            msg: "user already exist"
        })
    }

    else{
        await User.create({
            name: createPayload.name,
            username: createPayload.username,
            password: hashedPassword
        })
    
        res.json({
            msg: "User created successfully"
        })
    }
})

router.post('/signin', async(req, res)=>{
    const createPayload = req.body;

    const parsedPayload = UserSignin.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(403).json({
            msg: "invalid inputs"
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(createPayload.password, 10);
    const user = await User.findOne({
        username: createPayload.username
    })

    if(!user){
        res.status(403).json({
            msg: "Invalid username or password"
        })
        return;
    }
    
    const isMatch = await bcrypt.compare(createPayload.password, user.password);
    if(!isMatch){
        res.status(403).json({
            msg: "Invalid username or password"
        })
        return;
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1hr"})

    res.json({
        msg: "successfully signed in",
        token
    })

})

router.get('/course', async(req, res)=>{
    try{
        const courses = await Course.find();
        res.json({
            courses
        })

    }catch(err){
        res.status(500).json({
            msg: "internal sever error"
        })
    }
})

router.post('/course/:courseId', userMiddleware, async(req, res)=>{
    const courseId = req.params.courseId;
    const userId = (req as any).userId;
    try{
        await User.updateOne({
            _id: userId
        },{
            "$push":{
                purchasedCourses: courseId
            }
        })
        
   }catch(err){
        res.status(500).json({
            msg: "internal sever error"
        })
    }
})

export default router;