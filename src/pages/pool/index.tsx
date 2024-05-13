import { NextSeo } from "next-seo";
import WingImg from "@/assets/imgs/wing.svg";
import WaveImg from "@/assets/imgs/wave.svg";
import EthImg from "@/assets/imgs/ETH.svg";
import EosImg from "@/assets/imgs/EOS.svg";
import ArrowTopRightYellowImg from "@/assets/imgs/arrow-top-right-yellow.svg";
import Image from "next/image";
import SwapPanel from "@/components/Panels/SwapPanel";
import { Button } from "@material-tailwind/react";
import LiquidityPairPanel from "@/components/Panels/LiquidityPairPanel";
import { useStatusContext } from "@/context/StatusContext";

const liquidities = [
  {
    token1: "ETH",
    token2: "EOS",
    amount1: 0.000226482,
    amount2: 0.00069525491,
    sharedpercent: 0.14,
    totalamount: 0.000092210891,
    img1: EthImg,
    img2: EosImg,
  },
  {
    token1: "ETH",
    token2: "EOS",
    amount1: 0.000226482,
    amount2: 0.00069525491,
    sharedpercent: 0.14,
    totalamount: 0.000092210891,
    img1: EthImg,
    img2: EosImg,
  },
  {
    token1: "ETH",
    token2: "EOS",
    amount1: 0.000226482,
    amount2: 0.00069525491,
    sharedpercent: 0.14,
    totalamount: 0.000092210891,
    img1: EthImg,
    img2: EosImg,
  },
];

export default function Pool() {
  const { setAddLiquidityModalOpen } = useStatusContext();

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
          <div
            className="fixed bottom-0 right-[0px] h-[380px] w-[350px] overflow-hidden rounded-tl-full bg-[#EA862B] "
            style={{
              filter: "blur(260.5px)",
            }}
          />
          <div className="container relative z-50 mx-auto my-8 px-4 text-start lg:mt-24 lg:px-8">
            <div className="">
              <div className="text-[20px] lg:text-[24px]">
                Liquidity provider rewards
              </div>
              <div className="mt-4 text-[16px] lg:mt-8 lg:w-1/2 lg:text-[18px]">
                Liquidity providers earn a 0.3% fee on all trades proportional
                to their share of the pool. Fees are added to the pool, accrue
                in real time and can be claimed by withdrawing your liquidity.
              </div>
              <div className="mt-2 lg:mt-4">
                <span className="border-b border-blue text-[16px] text-blue lg:text-[18px]">
                  Read more about providing liquidity
                </span>
              </div>
            </div>
            <div className="mt-4 lg:mt-10">
              <div className="flex items-center justify-between">
                <div className="text-[20px] lg:text-[36px]">Your Liquidity</div>
                <div className="hidden items-center gap-2 lg:flex">
                  <Button
                    placeholder={undefined}
                    className="bg-light-panel text-[20px] font-semibold normal-case text-primary lg:text-[24px] dark:bg-dark-panel dark:text-dark-primary"
                  >
                    Create a Pair
                  </Button>
                  <Button
                    placeholder={undefined}
                    className="bg-gradient text-[20px] font-semibold normal-case text-white lg:text-[24px]"
                    onClick={() => setAddLiquidityModalOpen(true)}
                  >
                    Add Liquidity
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 lg:mt-6">
                <div className="cursor-pointer font-bold text-dark-primary">
                  Account analytics and accrued fees
                </div>
                <Image src={ArrowTopRightYellowImg} alt="arrow-yellow" />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 lg:hidden">
                <Button
                  placeholder={undefined}
                  className="bg-light-panel text-[16px] font-semibold normal-case text-primary lg:text-[24px] dark:bg-dark-panel dark:text-dark-primary"
                >
                  Create a Pair
                </Button>
                <Button
                  placeholder={undefined}
                  className="bg-gradient text-[16px] font-semibold normal-case text-white lg:text-[24px]"
                  onClick={() => setAddLiquidityModalOpen(true)}
                >
                  Add Liquidity
                </Button>
              </div>
              <div className="mt-4 lg:mt-8">
                {liquidities.map((item, index) => (
                  <LiquidityPairPanel
                    key={index}
                    img1={item.img1}
                    img2={item.img2}
                    amount1={item.amount1}
                    amount2={item.amount2}
                    sharedpercent={item.sharedpercent}
                    token1={item.token1}
                    token2={item.token2}
                    totalamount={item.totalamount}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-2 text-[16px] lg:gap-4 lg:text-[24px]">
                <div>Don’t see a pool you joined?</div>
                <div className="text-primary">Import it</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
