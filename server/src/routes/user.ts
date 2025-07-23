//User router
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import {UserSignin, UserSchema, CourseSchema} from "../utils/types";
import { User, Course} from "../models/db";
import { userMiddleware } from "../middleware/user";
import mongoose from "mongoose";

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

    const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role:"user"
            },
                 JWT_SECRET,
                {expiresIn: "1D"}
    )

    res.json({
        msg: "successfully signed in",
        token
    })

})

router.get('/course', async (req, res) => {
  try {
    let purchasedCourses: string[] = [];

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId);
        if (user?.purchasedCourses) {
          purchasedCourses = user.purchasedCourses.map((id: any) => id.toString());
        }
      } catch (err) {
        purchasedCourses = [];
      }
    }

    const courses = await Course.find().populate("createdBy", "username");
    const result = courses.map((course: any) => ({
      ...course.toObject(),
      isPurchased: purchasedCourses.includes(course._id.toString()),
    }));

    res.json({ courses: result });

  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post('/course/:courseId', userMiddleware, async(req, res)=>{
    const courseId = req.params.courseId;
    const userId = (req as any).user.userId;
    try{
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const purchasedCourses = Array.isArray(user.purchasedCourses)? user.purchasedCourses : [];
        const isPurchased = purchasedCourses.map(id => id.toString()).includes(courseId);

        if (isPurchased) {
        return res.status(400).json({ msg: "Course already purchased" });
        }

        const result = await User.updateOne(
            { _id: userId },
            { $addToSet: { purchasedCourses: courseId } }
        );
        console.log("Update Result:", result);

         res.status(200).json({
           msg: "Course purchased successfully"
        });
        
   }catch(err){
        res.status(500).json({
            msg: "internal sever error"
        })
    }
})

router.get('/purchased', userMiddleware, async (req, res) => {
  const userId = (req as any).user.userId;

  try {
    const user = await User.findById(userId)
      .populate({
        path: 'purchasedCourses',
        populate: {
          path: 'createdBy',
          select: 'username'  
        }
      });

    res.json({
      purchasedCourses: user?.purchasedCourses || []
    });

  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});


export default router;