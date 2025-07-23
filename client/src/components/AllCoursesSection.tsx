import { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "./CourseCard";
import { BACKEND_URL } from "../utils/config";

interface CreatedBy{
  _id: string;
  username: string
}

interface Course {
  _id: string;
  title: string;
  description: string;
  imgLink: string;
  price: string;
  createdBy: CreatedBy;
  isPurchased: boolean;
}

export function AllCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);



useEffect(() => {
  const fetchCourses = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/course`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.data.courses;
    setCourses(data); 
  };

  fetchCourses();
}, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courses.map((course) => (
      <CourseCard
        _id={course._id}
        key={course._id}
        title={course.title}
        description={course.description}
        imgLink={course.imgLink}
        price={course.price}
        createdBy={course.createdBy} 
        isPurchased={course.isPurchased}
      />

    ))}

    </div>
  );
}
