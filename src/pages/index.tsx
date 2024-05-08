import { NextSeo } from "next-seo";
import { Button } from "@material-tailwind/react";
import WingImg from "@/assets/imgs/wing.svg";
import BtcImg from "@/assets/imgs/btc.svg";
import Image from "next/image";
import SwapPanel from "@/components/Panels/SwapPanel";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Swapsats"
        description="Fee Free Inscription Swaps for Ordinals"
        openGraph={{
          title: "Swapsats",
          description: "Fee Free Inscription Swaps for Ordinals",
          siteName: "Swapsats",
          type: "website",
          images: [
            {
              url: "https://ordvision.s3.eu-north-1.amazonaws.com/mainnet/1714501672595.png",
              alt: "Swapsats",
              width: 1200,
              height: 630,
              type: "image/png",
            },
          ],
        }}
      />
      <div>
        <div className="relative">
          <div className="relative">
            <Image
              src={BtcImg}
              alt="wing"
              className="absolute left-0 top-4 opacity-50"
            />
            <Image
              src={WingImg}
              alt="wing"
              className="absolute right-0 lg:bottom-0 lg:top-4"
            />
            <div
              className="absolute right-[0px] top-[250px] h-[500px] w-[250px] overflow-hidden rounded-tl-full bg-[#EA862B]"
              style={{
                filter: "blur(260.5px)",
              }}
            ></div>
            <div className="relative z-50 mx-8 mt-4 text-start lg:mt-16 lg:text-center">
              <div className="text-[20px] font-bold lg:text-[48px]">
                Start Swapping Runes with Ordvision{" "}
              </div>
              <div className="gradient-color-title text-[20px] font-bold lg:text-[48px]">
                Secure, Fast, and User - Friendly
              </div>
              <div className="text-[#8B9497]">
                Join us today to unlock a new level of ease in managing your
                digital assets.{" "}
              </div>
            </div>
          </div>
          <div className="relative z-50">
            <SwapPanel />
          </div>
        </div>
      </div>
    </>
  );
}
