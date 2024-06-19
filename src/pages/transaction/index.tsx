import { NextSeo } from "next-seo";
import { Button } from "@material-tailwind/react";
import Image from "next/image";

import WingImg from "@/assets/imgs/wing.svg";
import BtcImg from "@/assets/imgs/btc.svg";
import Discord from "@/assets/imgs/discord.png";
import X from "@/assets/imgs/x.png";

import TransactionPanel from "@/components/Transaction";
import React from "react";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Runeswap | Swapsats.io"
        description="An innovative onchain marketplace. Swap between any rune on the $BTC chain"
        openGraph={{
          title: "Runeswap | Swapsats.io",
          description:
            "An innovative onchain marketplace. Swap between any rune on the $BTC chain",
          siteName: "Swapsats.io",
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
      <div className="overflow-hidden">
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
        <div className="relative z-50 sm:pb-[15px] sm:pt-[20px] lg:px-[80px] lg:pb-[40px] lg:pt-[80px]">
          <TransactionPanel />
        </div>
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
          <div className="flex items-center justify-center gap-4 ">
            <a
              className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC33] dark:bg-[#EAAC331A] "
              href="https://discord.com/invite/YW9R4K2Vg4"
              target="_blank"
            >
              <Image src={Discord} alt="Discord" />
            </a>
            <a
              className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC33] dark:bg-[#EAAC331A]"
              href="https://x.com/Swapsats_io"
              target="_blank"
            >
              <Image src={X} alt="X" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
