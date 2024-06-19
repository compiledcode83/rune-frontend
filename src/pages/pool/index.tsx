import { NextSeo } from "next-seo";
import WingImg from "@/assets/imgs/wing.svg";
import WaveImg from "@/assets/imgs/wave.svg";
import NullImg from "@/assets/imgs/null.svg";
import ArrowTopRightYellowImg from "@/assets/imgs/arrow-top-right-yellow.svg";
import Discord from "@/assets/imgs/discord.png";
import X from "@/assets/imgs/x.png";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import LiquidityPairPanel from "@/components/Pool/PoolPanels/LiquidityPairPanel";
import { useStatusContext } from "@/context/StatusContext";
import { useLiquidites } from "@/state/application/hooks/usePoolHooks";
import { useEffect } from "react";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import { customToast } from "@/components/toast";

export default function Pool() {
  const { setAddLiquidityModalOpen } = useStatusContext();
  const { ordinalAddress } = useUserContext();
  const { liquidities, setLiquidities } = useLiquidites();

  useEffect(() => {
    setLiquidities([]);
    if (ordinalAddress !== "") {
      (async () => {
        try {
          const resLiquidities =
            await poolApiService.getLiquidities(ordinalAddress);
          setLiquidities(resLiquidities);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [ordinalAddress]);

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
                Liquidity providers earn 40% of fees on all trades proportional
                to their share of the pool. Fees are added to the pool, accrue
                in real time and can be claimed by withdrawing your liquidity.
              </div>
              <div className="mt-2 lg:mt-4">
                <span className="border-b border-blue text-[16px] text-blue lg:text-[18px]">
                  <a
                    href="https://swapsats.gitbook.io/runeswap"
                    target="_blank"
                  >
                    Read more about providing liquidity
                  </a>
                </span>
              </div>
            </div>
            <div className="mt-4 lg:mt-10">
              <div className="flex items-center justify-between">
                <div className="text-[20px] lg:text-[36px]">Your Liquidity</div>
                <div className="hidden items-center gap-4 lg:flex">
                  <Button
                    placeholder={undefined}
                    className="bg-light-panel text-[16px] font-semibold normal-case text-primary lg:text-[24px] dark:bg-dark-panel dark:text-dark-primary"
                    onClick={() =>
                      customToast({
                        toastType: "info",
                        title: "Contact the team on discord",
                      })
                    }
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
              {/* <div className="mt-2 flex items-center gap-1 lg:mt-6">
                <div className="cursor-pointer font-bold text-dark-primary">
                  Account analytics and accrued fees
                </div>
                <Image src={ArrowTopRightYellowImg} alt="arrow-yellow" />
              </div> */}
              <div className="mt-2 flex items-center justify-between gap-2 lg:hidden">
                <Button
                  placeholder={undefined}
                  className="bg-light-panel text-[16px] font-semibold normal-case text-primary lg:text-[24px] dark:bg-dark-panel dark:text-dark-primary"
                  onClick={() =>
                    customToast({
                      toastType: "info",
                      title: "Contact the team on discord",
                    })
                  }
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
                {liquidities.length > 0 && ordinalAddress !== "" ? (
                  liquidities.map((item, index) => (
                    <LiquidityPairPanel
                      key={item.poolUuid}
                      tokenA={item.tokenA}
                      tokenB={item.tokenB}
                      uuid={item.poolUuid}
                    />
                  ))
                ) : (
                  <div className="mb-20 mt-16 flex flex-col items-center gap-[14px]">
                    <Image
                      src={NullImg}
                      alt="null"
                      className="h-[120px] w-[120px]"
                    />
                    <div className="text-[24px] text-[#A9A9A9]">
                      No liquidity found.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
            <div className="flex items-center justify-center gap-4 ">
              <a
                className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC331A]"
                href="https://discord.com/invite/YW9R4K2Vg4"
                target="_blank"
              >
                <Image src={Discord} alt="Discord" />
              </a>
              <a
                className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[#EAAC33EB] bg-[#EAAC331A]"
                href="https://x.com/Swapsats_io"
                target="_blank"
              >
                <Image src={X} alt="X" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
