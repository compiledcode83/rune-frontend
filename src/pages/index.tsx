import { NextSeo } from "next-seo";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import WingImg from "@/assets/imgs/wing.svg";
import BtcImg from "@/assets/imgs/btc.svg";
import Discord from "@/assets/imgs/discord.png";
import X from "@/assets/imgs/x.png";
import SwapPanel from "@/components/Swap/SwapPanels/SwapPanel";

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
              className="absolute -top-11 right-0 lg:bottom-0"
            />
            <div
              className="fixed bottom-0 right-[0px] h-[380px] w-[350px] overflow-hidden rounded-tl-full bg-[#EA862B] "
              style={{
                filter: "blur(260.5px)",
              }}
            />
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
            <div className="relative z-50">
              <SwapPanel />
            </div>
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
              <div className="flex items-center justify-center gap-4 ">
                <a
                  className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC331A]"
                  href={process.env.NEXT_PUBLIC_DISCORD_URL}
                  target="_blank"
                >
                  <Image src={Discord} alt="Discord" />
                </a>
                <a
                  className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC331A]"
                  href={process.env.NEXT_PUBLIC_X_URL}
                  target="_blank"
                >
                  <Image src={X} alt="X" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
