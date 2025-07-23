import { motion } from "framer-motion";
import { DeleteIcon } from "../icons/DeleteIcon";

type CourseCardProps = {
  _id: string;
  title: string;
  description: string;
  imgLink: string;
  price: string;
  onDelete: (courseId: string) => void;
};

export const AdminCourseCard = ({
  _id,
  title,
  description,
  imgLink,
  price,
  onDelete,
}: CourseCardProps) => {
  const rating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative bg-white p-4 md:p-5 border rounded-3xl shadow-lg text-black w-full max-w-[350px] sm:max-w-sm md:max-w-md mx-auto transition-all duration-300 hover:shadow-2xl"
    >
      <button
            onClick={() => onDelete(_id)}
            className="absolute top-3 right-3 z-20 bg-white shadow-md border p-1.5 rounded-full hover:bg-red-100 transition"
            aria-label="Delete course"
        >
        <DeleteIcon className="w-5 h-5 text-red-500 hover:text-red-600" />
        </button>


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
            <div className="flex items-center text-yellow-500 text-sm md:text-base gap-1 font-medium">
            {"⭐".repeat(rating)} <span className="text-gray-600">({rating})</span>
            </div>
        </div>

        
      </div>
    </motion.div>
  );
};
