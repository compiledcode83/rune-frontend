import { NextSeo } from "next-seo";
import { Button } from "@material-tailwind/react";
import Image from "next/image";

import WingImg from "@/assets/imgs/wing.svg";
import BtcImg from "@/assets/imgs/btc.svg";

import TransactionPanel from "@/components/Transaction";
import React from "react";

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
              className="absolute left-0 top-[80px] opacity-50"
            />
            <Image
              src={WingImg}
              alt="wing"
              className="absolute right-0 top-[18px] lg:bottom-0"
            />
            <div
              className="fixed bottom-0 right-[0px] h-[380px] w-[350px] overflow-hidden rounded-tl-full bg-[#EA862B] "
              style={{
                filter: "blur(260.5px)",
              }}
            />
          </div>
        </div>
        <div className="relative z-50 px-[20px] pb-[15px] pt-[20px] lg:px-[80px] lg:pb-[40px] lg:pt-[80px]">
          <TransactionPanel />
        </div>
      </div>
    </>
  );
}
