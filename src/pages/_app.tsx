import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, MaterialTailwindTheme } from "@material-tailwind/react";
import store from "../state/store";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import Modals from "@/components/Modals";
import { StatusProvider } from "@/context/StatusContext";
import { DarkThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import MainLayout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DarkThemeProvider>
        <StatusProvider>
          <UserProvider>
            <Provider store={store}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
              <Modals />
            </Provider>
          </UserProvider>
        </StatusProvider>
      </DarkThemeProvider>
    </ThemeProvider>
  );
}
