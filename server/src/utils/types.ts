import {z} from "zod";

export const UserSchema = z.object({
    name: z.string(),
    username: z.string().min(3).max(20).trim(),
    password:  z.string().min(3).trim(),
})

export const UserSignin = z.object({
    username: z.string().min(3).max(20).trim(),
    password:  z.string().min(3).trim(),
})

export const AdminSchema = z.object({
    name: z.string(),
    username: z.string().min(3).max(20).trim(),
    password:  z.string().min(3).trim(),
})

export const AdminSignin = z.object({
    username: z.string().min(3).max(20).trim(),
    password:  z.string().min(3).trim(),
})

export const CourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    imgLink: z.string(),
    price: z.number()
})

