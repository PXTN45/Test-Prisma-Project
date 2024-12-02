import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../AuthContext/auth.provider";
import { FaShoppingBag } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import { CiShoppingBasket } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function MYcommponent() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu absolute top-3 right-5 sm:right-0 z-0"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-end gap-4"
      >
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        ></motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="transition duration-600 ease-in-out p-4 menu bg-slate-300 rounded-box w-[180px]"
      >
        <motion.li variants={itemVariants}>
          {" "}
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </a>
        </motion.li>

        <motion.li variants={itemVariants}>
          {" "}
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Services
          </a>{" "}
        </motion.li>
        <motion.li variants={itemVariants}>
          {" "}
          <a>
          <RiShoppingBag3Line />
            Shop
          </a>{" "}
        </motion.li>
        <motion.li
          variants={itemVariants}
          className="hover:bg-red-500 rounded-lg"
          onClick={logout}
        >
          <a>
            <HiOutlineLogout className="text-lg" />
            Logout
          </a>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
