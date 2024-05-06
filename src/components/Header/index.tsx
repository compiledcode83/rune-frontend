import React, { useState } from "react";
import Image from "next/image";
import LightThemeImg from "@/assets/imgs/lighttheme.svg";
import DarkThemeImg from "@/assets/imgs/darktheme.svg";
import { Navbar } from "@material-tailwind/react";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <div className="flex items-center justify-between border-b border-[#818C90] px-[32px] py-4 lg:px-[150px]">
      <div className="text-[24px] lg:text-[32px]">
        <span className="text-primary">SWAPSTATS</span> BY ORDINAL EGGS
      </div>
      <div>
        <Image
          src={theme === "dark" ? LightThemeImg : DarkThemeImg}
          alt="theme img"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
