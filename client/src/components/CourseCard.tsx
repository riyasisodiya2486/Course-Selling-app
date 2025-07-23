import { motion } from "framer-motion";
import { BACKEND_URL } from "../utils/config";
import axios from "axios";
import { Button } from "./Button";
import { getUserInfoFromToken } from "../utils/getusername";

interface CreatedBy {
  _id: string;
  username: string;
}

type CourseCardProps = {
  _id: string;
  title: string;
  description: string;
  imgLink: string;
  price: string;
  createdBy: CreatedBy;
  isPurchased?: boolean;
};

export const CourseCard = ({
  _id,
  title,
  description,
  imgLink,
  price,
  createdBy,
  isPurchased = false,
}: CourseCardProps) => {
    const rating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    const handleBuy = async () => {
      if (isPurchased) return;
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please sign in to purchase this course.");
        return;
      }

      const userInfo = getUserInfoFromToken(token);
      if (userInfo?.role === "admin") {
        alert("Admins are not allowed to purchase courses.");
        return;
      }
      try {
        await axios.post(
          `${BACKEND_URL}/api/v1/user/course/${_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Course purchased. Refreshing page...");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Failed to purchase the course");
      }
    };


 return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white p-4 md:p-5 border rounded-3xl shadow-lg text-black w-full max-w-[350px] sm:max-w-sm md:max-w-md mx-auto transition-all duration-300 hover:shadow-2xl"
    >
      <img
        src={imgLink}
        alt={title}
        className="w-full h-44 md:h-52 object-cover rounded-2xl shadow-sm"
      />

      <div className="mt-4 space-y-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm md:text-base text-gray-600 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center text-sm">
          <p className="text-green-600 font-bold text-base md:text-lg">₹{price}</p>
          <span className="text-gray-500">By {createdBy.username}</span>
        </div>

        <div className="flex items-center text-yellow-500 text-sm md:text-base gap-1 font-medium">
          {"⭐".repeat(rating)} <span className="text-gray-600">({rating})</span>
        </div>

        <Button
          variant={isPurchased ? "secondary" : "primary"}
          text={isPurchased ? "Purchased" : "Buy Now" }
          onClick={handleBuy}
          fullWidth
          disabled={isPurchased}
        />
      </div>
    </motion.div>
  );
};
