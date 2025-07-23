import { motion, AnimatePresence } from "framer-motion";
import { BellIcon } from "../icons/BellIcon";
import { useEffect, useState } from "react";
import { getUserInfoFromToken } from "../utils/getusername";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; 
import { Button } from "./Button";
import logo from "../assets/logo.png";


interface navbarProps{
  toggleSidebar: () => void;
}

export function Navbar({toggleSidebar}: navbarProps) {
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = getUserInfoFromToken(token);
    const name = userInfo?.username;
    setUsername(name);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/signin");
  };



  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="w-full  py-4  flex items-center justify-between z-50"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold text-black hidden sm:inline">
          <div className="flex items-center gap-4 ">
              <span className="h-10 w-10">
                 <img src={logo} alt="Logo" className="object-cover" />
               </span>
               <span className="text-xl font-bold">E-Learning</span>
          </div>
        </span>
      </div>

      {/* Desktop Actions */}
      <div className="hidden sm:flex items-center gap-6">
        <BellIcon />
        {username ? (
          <>
            <span className="text-gray-800 font-medium">Hi, {username}</span>
            <Button
              variant="primary"
              onClick={handleLogout}
              text="Logout"
            />
          </>
        ) : (
          <>
            <Button
              text="Sign in"
              variant="secondary"
              onClick={() => navigate("/signin")}
            />
            <Button
              text="Sign up"
              variant="primary"
              onClick={() => navigate("/signup")}
           />
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        <button onClick={() => toggleSidebar()}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-20 left-0 w-full px-6 py-4 bg-white shadow-md flex flex-col items-center gap-4 sm:hidden z-40 rounded-b-xl"
          >
            
            {username ? (
              <>
                <span className="text-gray-800 font-medium">Hi, {username}</span>
                <Button
                  onClick={handleLogout}
                  text="Logout"
                  variant="secondary"/>
              </>
            ) : (
              <>
                <Button
                  text="Sign in"
                  onClick={() => {
                    navigate("/signin");
                    setMenuOpen(false);
                  }}
                  variant="secondary"
                />
                  
                <Button
                  text="Sign up"
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                  variant="primary"
                />
                  
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
