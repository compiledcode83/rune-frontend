import type { AppProps } from "next/app";
import React from "react";
import Header from "../Header";
import Modals from "../Modals";
import SwapModals from "../Swap/SwapModals";
import { useThemeContext } from "@/context/ThemeContext";
import { Toaster } from "sonner";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { darkMode } = useThemeContext();
  return (
    <div
      className={`${darkMode ? "bg-dark-bg text-white" : "bg-light-bg text-black"}  min-h-screen overflow-auto`}
      data-mode={darkMode ? "dark" : "light"}
    >
      <Header />
      <div className="relative z-10 h-full">
        <main className="">{children}</main>
      </div>
      <Modals />
      <SwapModals />
      <Toaster position="top-right" expand={false} />
    </div>
  );
};

export default MainLayout;
