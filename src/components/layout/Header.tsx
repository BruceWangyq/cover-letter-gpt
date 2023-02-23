import Link from "next/link";
import menuData from "./menuData";
import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";

import { useState } from "react";
import ThemeToggler from "../ThemeToggler";
import { AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";
import { useSignInModal } from "./sign-in-modal";
import { motion } from "framer-motion";
import UserDropdown from "./UserDropdown";
import { FADE_IN_ANIMATION_SETTINGS } from "@/utils/motion";

export default function Header() {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // Sign In Modal
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <header
        className={`header px-2 top-0 left-0 z-40 flex w-full justify-center items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container relative -mx-4 h-20 flex w-full items-center justify-between">
          <div className="w-full px-2 lg:ml-16 xl:mr-12">
            <Link href="/">
              <h1 className="text-xl  font-extrabold text-orange-500">
                Cover-Letter-GPT
              </h1>
            </Link>
          </div>

          <ThemeToggler />
        </div>
      </header>
    </>
  );
}
