import React from "react";

import { NextSeo } from "next-seo";

import WingImg from "@/assets/imgs/wing.svg";
import WaveImg from "@/assets/imgs/wave.svg";
import Image from "next/image";
import ClaimPanel from "@/components/Claim/ClaimPanel";

export default function Claim() {
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
        <div className="relative h-full">
          <Image
            src={WingImg}
            alt="wing"
            className="fixed left-0 scale-x-[-1] lg:bottom-0 lg:top-24"
          />
          <Image
            src={WaveImg}
            alt="wing"
            className="fixed bottom-0 opacity-50"
          />
        </div>
        <ClaimPanel />
      </div>
    </>
  );
}