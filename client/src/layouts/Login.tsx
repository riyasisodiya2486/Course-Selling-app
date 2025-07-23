import loginImg from "../assets/login.webp";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Dropdown from "../components/Dropdown";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../utils/config";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Login() {
  const loginOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    setIsLoading(true);
    try {
      const response = await axios.post(BACKEND_URL + `/api/v1/${selectedOption}/signin`, {
        username,
        password
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage:", localStorage.getItem("token"));
      } else {
      console.warn("Token is undefined in response");
      }

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      alert("invalid username or password");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="min-h-screen w-full flex flex-wrap bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] relative overflow-hidden p-4 md:p-4"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full md:w-1/4  py-10 px-7 text-white text-center md:text-left pb-0"
        >
          <p className="text-lg font-semibold">
            Ready to level up? Sign in and continue the journey!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hidden md:block absolute z-10 left-56 h-1/3 w-[30%] top-36"
        >
          <img src={loginImg} alt="login Visual" />
        </motion.div>

        <div className="w-0 flex mb-6 md:hidden">
          <img src={loginImg} alt="login Visual" />
        </div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="relative w-full md:w-9/12 rounded-3xl flex flex-col justify-center items-center text-center bg-white py-10 px-6 mt-10 md:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute top-4 right-4 w-44"
          >
            <Dropdown
              label="Choose to Sign in as"
              options={loginOptions}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1 }}
            className="text-4xl md:text-5xl mb-6 mt-4 md:mt-0"
          >
            Login
          </motion.h1>

          <motion.div
            className="flex flex-col gap-3 w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Input type="text" placeholder="Username" reference={usernameRef} />
            <Input type="password" placeholder="Password" reference={passwordRef} />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                text={isLoading ? "Logging in..." : "Login"}
                fullWidth={true}
                onClick={login}
                loading={isLoading}
              />
            </motion.div>

            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600">
                Sign Up
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
