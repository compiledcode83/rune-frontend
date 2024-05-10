import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Setting from "@/assets/imgs/setting.svg";
import Eth from "@/assets/imgs/ETH.svg";
import Eos from "@/assets/imgs/EOS.svg";
import ArrowDown from "@/assets/imgs/arrowdown.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import SettingPanel from "./SettingPanel";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useStatusContext } from "@/context/StatusContext";

import {
  useSendToken,
  useReceiveToken,
  useSendTokenAmount,
  useReceiveTokenAmount,
  usePoolTokens,
} from "@/state/application/hooks/useSwapHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";

const SwapPanel = () => {
  const {
    setSwapSelectSendTokenModalOpen,
    setSwapSelectReceiveTokenModalOpen,
    setSwapConfirmModalOpen,
    setConnectWalletModalOpen,
  } = useStatusContext();

  const { ordinalAddress } = useUserContext();

  const handleConfirmSwapModalOpen = () => {
    setSwapConfirmModalOpen(true);
  };
  const { sendToken, setSendToken } = useSendToken();
  const { setPoolTokens } = usePoolTokens();
  const { receiveToken, setReceiveToken } = useReceiveToken();
  const { sendTokenAmount, setSendTokenAmount } = useSendTokenAmount();
  const { receiveTokenAmount, setReceiveTokenAmount } = useReceiveTokenAmount();

  const handleTokenAmount = async (sendAmount: number) => {
    setSendTokenAmount(sendAmount);
  };

  const getReceiveAmount = async (sendAmount: number) => {
    const res = await poolApiService.getSwapAmount(
      sendToken.uuid,
      sendAmount,
      receiveToken.uuid
    );
    console.log(res);
    setReceiveTokenAmount(Number(res.receivingTokenAmount));
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (receiveToken.uuid !== "") {
        getReceiveAmount(sendTokenAmount);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [sendTokenAmount, receiveToken]);

  useEffect(() => {
    (async () => {
      try {
        const resPoolTokens = await poolApiService.getPoolTokens();
        if (resPoolTokens.length < 2)
          throw new Error("there must be more than 1 token");
        setSendToken(resPoolTokens[0]);
        setPoolTokens(resPoolTokens);
        console.log({ resPoolTokens });
      } catch (error) {
        console.error((error as Error).message);
      }
    })();
  }, []);

  return (
    <div>
      <div className="mx-auto mt-8 w-[350px] rounded-xl bg-light-panel p-4 lg:w-[526px] dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="pl-8 text-[20px] font-bold lg:text-[28px]">Swap</div>
          <div>
            <Popover
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom-end"
            >
              <PopoverHandler>
                <Image src={Setting} alt="setting" className="cursor-pointer" />
              </PopoverHandler>
              <PopoverContent
                placeholder={undefined}
                className="z-[100] rounded-none border-none bg-transparent p-0"
              >
                <SettingPanel />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="relative mt-2">
          <div className="rounded-xl bg-light-item p-4 px-6 dark:bg-dark-item">
            <div className="flex items-center justify-between">
              <div
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-panel px-4 py-2 lg:gap-4 dark:bg-dark-panel"
                onClick={() => setSwapSelectSendTokenModalOpen(true)}
              >
                <Image
                  src={sendToken.imgUrl}
                  alt={sendToken.name}
                  width={24}
                  height={24}
                />
                <div className="text-[12px] lg:text-[14px]">
                  {sendToken.name}
                </div>
                <Image src={ArrowDown} alt="eth" />
              </div>
              <div>
                <input
                  className="w-[60px] bg-transparent text-right outline-none focus:overflow-hidden"
                  value={sendTokenAmount}
                  onChange={(e) => handleTokenAmount(Number(e.target.value))}
                  type="number"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
              <div>Balance: 2.8989 ETH (MAX)</div>
              <div>≈$ 6726.2307</div>
            </div>
          </div>
          <div className="mt-2 rounded-xl bg-light-item p-4 px-6 dark:bg-dark-item">
            <div className="flex items-center justify-between">
              {receiveToken.uuid === "" ? (
                <Button
                  placeholder={undefined}
                  className="bg-gradient font-bold"
                  onClick={() => setSwapSelectReceiveTokenModalOpen(true)}
                >
                  Select Token
                </Button>
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-panel px-4 py-2 lg:gap-4 dark:bg-dark-panel"
                  onClick={() => setSwapSelectReceiveTokenModalOpen(true)}
                >
                  <Image
                    src={receiveToken.imgUrl}
                    alt={receiveToken.name}
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] lg:text-[14px]">
                    {receiveToken.name}
                  </div>
                  <Image src={ArrowDown} alt="eth" />
                </div>
              )}
              <div>{receiveTokenAmount}</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
              <div>Balance: 400.8989 EOS</div>
              <div>≈$ 284.6382</div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[5px] border-light-panel bg-light-item p-2 dark:border-dark-panel dark:bg-dark-item">
            <Image src={Arrow2} alt="exchangearrow" />
          </div>
        </div>
        <div className="mt-8">
          {ordinalAddress === "" ? (
            <Button
              className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
              placeholder={undefined}
              onClick={() => setConnectWalletModalOpen(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
              placeholder={undefined}
              onClick={() => handleConfirmSwapModalOpen()}
            >
              Swap
            </Button>
          )}
        </div>
      </div>
      <div className="mx-auto my-8 flex w-[350px] flex-col gap-2 text-[12px] lg:w-[500px] lg:gap-4 lg:text-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Minimum received
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>9.741 EOS</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Price Impact
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.01%</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Liquidity Provider Fee
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.0000066 ETH</div>
        </div>
        <div className="cursor-pointer text-center text-primary dark:text-[#EAAC33]">
          View Pair Analytics
        </div>
      </div>
    </div>
  );
};

export default SwapPanel;
