import React, { useState } from "react";
import Image from "next/image";
import LightThemeImg from "@/assets/imgs/lighttheme.svg";
import DarkThemeImg from "@/assets/imgs/darktheme.svg";
import { Button, Navbar } from "@material-tailwind/react";
import { useThemeContext } from "@/context/ThemeContext";
import DarkLogo from "@/assets/imgs/dark-logo.png";
import LightLogo from "@/assets/imgs/light-logo.png";
import Link from "next/link";

const Header = () => {
  const { darkMode, handleTheme } = useThemeContext();

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#818C90] px-[16px] py-4 lg:px-[150px]">
        <div className="flex items-center gap-2 lg:gap-16">
          <Image
            src={darkMode ? DarkLogo : LightLogo}
            alt="logo img"
            className="w-[220px] cursor-pointer lg:w-[350px]"
          />
          <div className="hidden items-center text-[24px] 2xl:flex 2xl:gap-12">
            <Link href={"/"}>
              <div className="cursor-pointer transition-all hover:border-b hover:border-primary hover:text-primary">
                Swap
              </div>
            </Link>
            <Link href={"/pool"}>
              <div className="cursor-pointer transition-all hover:border-b hover:border-primary hover:text-primary">
                Pool
              </div>
            </Link>
            <Link href={"/claim"}>
              <div className="cursor-pointer transition-all hover:border-b hover:border-primary hover:text-primary">
                Claim
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 lg:gap-4">
          <Button
            placeholder={undefined}
            className="bg-[#EAAC33] bg-opacity-20 px-1 py-2 text-[16px] normal-case text-primary lg:px-4"
          >
            <div className="hidden lg:block">Connect to a wallet</div>
            <div className="lg:hidden">Connect</div>
          </Button>
          <Image
            src={darkMode ? LightThemeImg : DarkThemeImg}
            alt="theme img"
            className="cursor-pointer"
            onClick={handleTheme}
            height={38}
          />
        </div>
      </div>
      <div className="relative z-50 flex items-center gap-2 px-4 py-2 2xl:hidden">
        <Link href={"/"}>
          <Button
            placeholder={undefined}
            className="bg-transparent px-2 py-1 text-[16px] normal-case text-black transition-all hover:bg-dark-item hover:text-primary dark:text-white"
          >
            Swap
          </Button>
        </Link>
        <Link href={"/pool"}>
          <Button
            placeholder={undefined}
            className="bg-transparent px-2 py-1 text-[16px] normal-case text-black transition-all hover:bg-dark-item hover:text-primary dark:text-white"
          >
            Pool
          </Button>
        </Link>
        <Link href={"/claim"}>
          <Button
            placeholder={undefined}
            className="bg-transparent px-2 py-1 text-[16px] normal-case text-black transition-all hover:bg-dark-item hover:text-primary dark:text-white"
          >
            Claim
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
