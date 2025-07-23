import { motion } from "framer-motion";
import { SidebarItem } from "./SidebarItem";
import { HomeIcon } from "../icons/HomeIcon";
import { CourseIcon } from "../icons/CourseIcon";
import { PurchaseIcon } from "../icons/PurchaseIcon";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfoFromToken } from "../utils/getusername";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { PlusIcon } from "../icons/PlusIcon";
import { MyCourseIcon } from "../icons/MyCourseIcon";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = getUserInfoFromToken(token);
    if (userInfo && userInfo.role) {
      setRole(userInfo.role);
    }
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BACKEND_URL}/api/v1/admin/createcourse`,
        {
          title,
          description,
          imgLink,
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course created successfully!");
      setShowCreateCourseModal(false);

      // Reset form
      setTitle("");
      setDescription("");
      setImgLink("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Failed to create course.");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`
          fixed sm:static top-0 left-0 z-40 sm:z-auto h-screen w-56 bg-white/10 shadow-lg p-6 py-7
          ${isOpen ? "block" : "hidden"} sm:block
        `}
      >
        {/* Close button (mobile only) */}
        <div className="sm:hidden flex justify-end mb-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 text-start">
          <h1 className="font-bold text-lg text-gray-700">Main menu</h1>

          <div onClick={() => navigate("/home")}>
            <SidebarItem title="Home" startIcon={<HomeIcon />} />
          </div>

          <div onClick={() => navigate("/courses")}>
            <SidebarItem title="Courses" startIcon={<CourseIcon />} />
          </div>

          {role === "admin" && (
            <>
              <div onClick={() => navigate("/mycourses")}>
                <SidebarItem title="My Courses" startIcon={<MyCourseIcon />} />
              </div>
              <div onClick={() => setShowCreateCourseModal(true)}>
                <SidebarItem title="Create Course" startIcon={<PlusIcon />} />
              </div>
            </>
          )}

          {role === "user" && (
            <div onClick={() => navigate("/purchased")}>
              <SidebarItem
                title="Purchased Courses"
                startIcon={<PurchaseIcon />}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Create Course Modal */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-3 right-4 text-black text-2xl"
              onClick={() => setShowCreateCourseModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-5 text-gray-800">
              Create Course
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleCreateCourse}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={imgLink}
                onChange={(e) => setImgLink(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-700 hover:via-[#a18cd1] to-[#fbc2eb] hover:via-purple-700 hover:to-blue-700 text-white  transition-all duration-300 shadow-sm font-bold px-4 py-2 rounded-2xl  flex items-center justify-center space-x-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
