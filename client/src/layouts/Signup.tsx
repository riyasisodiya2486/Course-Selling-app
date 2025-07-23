import signupImg from "../assets/signup.png";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Dropdown from "../components/Dropdown";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Signup() {
  const SignupOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    setIsLoading(true);
    try {
      await axios.post(BACKEND_URL + `/api/v1/${selectedOption}/signup`, {
        username,
        password,
        name,
      });
      alert("Your account has been created!");
      navigate("/signin");
      
    } catch (err) {
      console.log(err);
      alert("invalid credentials or user alerady exist");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen w-full flex flex-wrap bg-gradient-to-r from-[#a18cd1] to-[#aa9bff] relative overflow-hidden p-10 pt-28 md:p-4"
    >

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="md:relative  w-full md:w-9/12 rounded-3xl flex flex-col justify-center items-center text-center bg-white py-10  px-6  shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute md:top-4 top-1 left-4 md:w-44"
        >
          <Dropdown
            label="Choose to Sign up as"
            options={SignupOptions}
            value={selectedOption}
            onChange={setSelectedOption}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.1 }}
          className="text-4xl md:text-5xl mb-8 mt-6 md:mt-0 font-"
        >
          Create Account
        </motion.h1>

        <motion.div
          className="flex flex-col gap-3 w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Input type="text" placeholder="Full Name" reference={nameRef} />
          <Input type="text" placeholder="Username" reference={usernameRef} />
          <Input type="password" placeholder="Password" reference={passwordRef} />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="primary"
              text={isLoading ? "Creating..." : "Sign up"}
              fullWidth={true}
              onClick={signup}
              loading={isLoading}
            />
          </motion.div>

          <p className="text-sm text-gray-700 mt-2">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="hidden md:block absolute z-10 right-36 h-1/3 w-[30%] top-44"
      >
        <img src={signupImg} alt="Signup Visual" />
      </motion.div>

      <div className="w-0 flex mb-6 md:hidden">
        <img src={signupImg} alt="Signup Visual" />
      </div>

      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className=" md:w-1/4 w-full py-10 px-7 text-white text-center md:text-left"
      >
        <p className="text-lg font-semibold">
          Ready to level up? Sign up and let the learning adventure begin!
        </p>
      </motion.div>
      
    </motion.div>
  );
}
