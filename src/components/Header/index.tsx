import React, { useState } from "react";
import Image from "next/image";
import LightThemeImg from "@/assets/imgs/lighttheme.svg";
import DarkThemeImg from "@/assets/imgs/darktheme.svg";
import BtcButton from "@/assets/imgs/btc-button.svg";
import LogOff from "@/assets/imgs/log-off.svg";
import { Button, Navbar } from "@material-tailwind/react";
import { useThemeContext } from "@/context/ThemeContext";
import DarkLogo from "@/assets/imgs/dark-logo.png";
import LightLogo from "@/assets/imgs/light-logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

import { useStatusContext } from "@/context/StatusContext";
import { useUserContext } from "@/context/UserContext";
import { addressShortening } from "@/utils/adress";

const MenuItems = [
  { name: "Swap", link: "/" },
  { name: "Pool", link: "/pool" },
  { name: "Claim", link: "/claim" },
];
const Header = () => {
  const router = useRouter();
  const { darkMode, handleTheme } = useThemeContext();
  const { setConnectWalletModalOpen } = useStatusContext();
  const { isConnected, paymentAddress, handleDisconnect } = useUserContext();
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
            {MenuItems.map((menu) => {
              return (
                <Link href={menu.link} key={menu.link}>
                  <div
                    className={`cursor-pointer transition-all hover:border-b hover:border-primary hover:text-primary ${menu.link === router.pathname ? "border-b-[1px] border-primary text-primary " : ""}`}
                  >
                    {menu.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-1 lg:gap-4">
          <Image
            src={BtcButton}
            alt="btc button"
            className="cursor-pointer"
            height={38}
          />
          <Button
            placeholder={undefined}
            className="bg-[#EAAC33] bg-opacity-20 px-1 py-2 text-[16px] normal-case text-primary lg:px-4"
            onClick={() => {
              !isConnected
                ? setConnectWalletModalOpen(true)
                : handleDisconnect();
            }}
          >
            {!isConnected ? (
              <>
                <div className="hidden lg:block">Connect to a wallet</div>
                <div className="lg:hidden">Connect</div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {addressShortening(paymentAddress)}
                <Image
                  src={LogOff}
                  alt="log off"
                  className="cursor-pointer"
                  height={18}
                />
              </div>
            )}
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
        {MenuItems.map((menu) => {
          return (
            <Link href={menu.link} key={menu.link}>
              <Button
                placeholder={undefined}
                className={`bg-transparent px-2 py-1 text-[16px] normal-case text-black transition-all hover:bg-light-item hover:text-primary dark:hover:bg-dark-item  ${menu.link === router.pathname ? " !important text-primary" : "dark:text-white"}`}
              >
                {menu.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
