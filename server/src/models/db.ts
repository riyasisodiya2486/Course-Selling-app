import mongoose, { mongo } from 'mongoose'
import dotenv from "dotenv";
import { required } from 'zod/v4/core/util.cjs';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
},
    {timestamps: true})

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }},
    {timestamps: true})

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imgLink: String,
    price: String,
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Admin" 
    }},
    {timestamps:true})


export const User = mongoose.model("User", UserSchema);
export const Admin = mongoose.model("Admin", AdminSchema);
export const Course = mongoose.model("Course", CourseSchema);
