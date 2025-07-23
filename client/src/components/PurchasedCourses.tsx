import { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "./CourseCard";
import { BACKEND_URL } from "../utils/config";
interface CreatedBy {
  _id: string;
  username: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  imgLink: string;
  price: string;
  createdBy: CreatedBy;
}

export function PurchasedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPurchased = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/purchased`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.purchasedCourses;
      setCourses(Array.isArray(data) ? data : [data]);

      console.log(data);

    } catch (err) {
      console.log("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPurchased();
}, []);



  if (loading) return <div className="text-center text-lg mt-10">Loading courses...</div>;

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    {Array.isArray(courses) && courses.length === 0 ? (
      <div className="text-center col-span-full text-gray-500">No purchased courses yet.</div>
    ) : (
      courses.map(course => (
        <CourseCard
          key={course._id}
          _id={course._id}
          title={course.title}
          description={course.description}
          imgLink={course.imgLink}
          price={course.price}
          createdBy={course.createdBy} 
          isPurchased={true}
        />
      ))
    )}
  </div>
  );

}
