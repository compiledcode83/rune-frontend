import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, MaterialTailwindTheme } from "@material-tailwind/react";
import store from "../state/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Modals from "@/components/Modals";
import { StatusProvider } from "@/context/StatusContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <StatusProvider>
        <Provider store={store}>
          <div className="min-h-screen overflow-auto bg-dark text-white">
            <Header />
            <div className="relative z-10">
              <main className="text-white">
                <Component {...pageProps} />
              </main>
            </div>
            <Modals />
          </div>
          <Toaster position="top-right" expand={false} />
        </Provider>
      </StatusProvider>
    </ThemeProvider>
  );
}
