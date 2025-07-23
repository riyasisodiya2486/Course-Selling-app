import { motion } from "framer-motion";
import heroImg from "../assets/landingpage.webp"; 
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

export function HomePageContent() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-blue-50 via-fuchsia-50 to-orange-100 p-6">
      {/* Hero Section */}
      <section className="px-6 md:px-16 flex flex-col-reverse lg:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Master New Skills with{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-orange-500 text-transparent bg-clip-text">
              CourseHub
            </span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Project-based learning from top instructors to accelerate your
            career or passion.
          </p>
          <div className="flex gap-4">
            <button 
                onClick={()=>{navigate('/courses')}} 
                className="bg-gradient-to-r from-fuchsia-400 to-orange-500 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition">
              Explore Courses
            </button>
            <button className="border border-fuchsia-400 text-fuchsia-400 px-6 py-3 rounded-full hover:bg-fuchsia-50 transition">
              Start Learning
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={heroImg}
            alt="Learning"
            className="w-[460px] drop-shadow-xl rounded-xl"
          />
        </motion.div>
      </section>

      {/* Popular Courses */}
      <section className="px-6 md:px-16 py-16 bg-white rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-fuchsia-50 to-orange-50 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Full Stack Web Development
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Master frontend and backend technologies with hands-on projects.
              </p>
              <div className="flex items-center gap-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span className="text-gray-600 text-sm">(4.9)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-20 bg-gradient-to-r from-purple-100 via-fuchsia-50 to-blue-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose E-Learning?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Expert Instructors",
              desc: "Learn from industry professionals with real-world experience.",
            },
            {
              title: "Lifetime Access",
              desc: "Access your courses anytime, anywhere after purchase.",
            },
            {
              title: "Certification",
              desc: "Get certified and boost your resume after course completion.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border border-fuchsia-100"
            >
              <h4 className="text-xl font-semibold mb-2 text-fuchsia-700">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          What Our Learners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {["Alice", "John"].map((name, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-fuchsia-50 p-6 rounded-2xl shadow hover:shadow-md"
            >
              <p className="text-gray-700 italic mb-3">
                “This platform completely transformed the way I learn. The
                instructors are fantastic!”
              </p>
              <p className="text-gray-900 font-semibold">— {name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 px-6 bg-white shadow-md rounded-2xl"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Learn Without Limits
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore thousands of courses, tutorials, and skills with our curated content crafted by top educators.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"
            >
              Get Started
            </motion.button>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Expert Tutors", desc: "Learn from the best in the industry." },
              { title: "Flexible Learning", desc: "Study at your own pace anytime." },
              { title: "Certifications", desc: "Get certified after course completion." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg p-6 rounded-xl text-center"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-xl font-bold mb-2 text-blue-700">{feature.title}</h2>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* Footer */}
          <div className="mt-12">
            <Footer />
          </div>
    </div>
  );
}
