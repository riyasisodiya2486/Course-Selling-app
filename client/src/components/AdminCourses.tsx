import { useEffect, useState } from "react";
import axios from "axios";
import { AdminCourseCard } from "./AdminCourseCard";
import { BACKEND_URL } from "../utils/config";


type Course = {
  _id: string;
  title: string;
  description: string;
  imgLink: string;
  price: string;
};
export function AdminCourses() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/api/v1/admin/mycourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyCourses(res.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (courseId: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/admin/deletecourse/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data || "Course deleted");
      
      setMyCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {myCourses.map(course => (
        <AdminCourseCard key={course._id} {...course} onDelete={handleDelete} />
      ))}
    </div>
  );
}
