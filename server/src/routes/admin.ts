//Admin router
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import {AdminSignin, AdminSchema, CourseSchema} from "../utils/types";
import { Admin, Course} from "../models/db";
import { adminMiddleware } from "../middleware/admin";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string; 

router.post('/signup', async(req, res)=>{
    const createPayload = req.body;
    const parsedPayload = AdminSchema.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(403).json({
            msg: "invalid inputs"
        })
        return;
    }    
    const user = await Admin.findOne({
        username: createPayload.username
    })

    const hashedPassword = await bcrypt.hash(createPayload.password, 10);

    if(user){
        res.status(404).json({
            msg: "user already exist"
        })
    }

    else{
        await Admin.create({
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

    const parsedPayload = AdminSignin.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(403).json({
            msg: "invalid inputs"
        })
        return;
    }
    const user = await Admin.findOne({
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

    const token = jwt.sign(
        {
            adminId: user._id,
            username: user.username,
            role:"admin"
        },
             JWT_SECRET,
            {expiresIn: "1D"}
    )

    res.json({
        msg: "successfully signed in",
        token
    })

})

router.post('/createcourse', adminMiddleware, async(req, res)=>{
    const createPayload = req.body;
    console.log(req.body);
    const parsedPayload = CourseSchema.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(403).json({
            msg: "invalid inputs"
        })
        return;
    }

    try{ const newCourse = await Course.create({
        title: createPayload.title,
        description: createPayload.description,
        imgLink: createPayload.imgLink,
        price:createPayload.price,
        createdBy: (req as any).user.adminId
    })
    res.json({
        msg: "course created successfully",
        id: newCourse._id
    })}
    catch(err){
        res.json({
            msg: err
        })
    }

})

router.get('/course', adminMiddleware, async(req, res)=>{
    try{
       const courses = await Course.find().populate({
            path: 'createdBy',
            select: 'username'
        });
        res.json({
            courses
        })

    }catch(err){
        res.status(500).json({
            msg: "internal sever error"
        })
    }
})

router.get('/mycourses', adminMiddleware, async (req, res) => {
  const adminId = (req as any).user.adminId;
  try {
    const courses = await Course.find({ createdBy: adminId });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put('/updatecourse/:courseId', adminMiddleware, async(req, res)=>{
    const courseId = req.params.courseId;
    const updateData = req.body;
    
    try{
        const updateCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        if(!updateCourse){
            res.status(404).json({
                msg: "course not found"
            })
        }
        res.json({
           msg: "Course updated successfully",
           course: updateCourse
        })

    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/deletecourse/:courseId', adminMiddleware, async(req, res)=>{
    const courseId = req.params.courseId;
    
    try{
        const deleteCourse = await Course.findByIdAndDelete(courseId)

        if(!deleteCourse){
            res.status(404).json({
                msg: "course not found"
            })
        }
        res.json({
           msg: "Course deleted successfully"
        })

    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;







