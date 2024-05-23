import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Btc from "@/assets/imgs/btc-ico.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { BalanceType, TokenType } from "@/types/type";

import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import {
  useCollectFeeAmount,
  useCollectFeePoolUuid,
  // useCollectFeeTokenA,
  // useCollectFeeTokenAAmount,
  // useCollectFeeTokenB,
  // useCollectFeeTokenBAmount,
} from "@/state/application/hooks/usePoolHooks";
import { customToast } from "@/components/toast";
import { signPsbt, stringToDisplay } from "@/utils/utils";
import { DOWN_TIME_FOR_CONFIRM_TX } from "@/configs/constants";

const CollectFeesPanel = () => {
  const {
    setCollectFeesModalOpen,
    setTxSubmittedModalOpen,
    setTransactionId,
    setTransactionDesc,
  } = useStatusContext();

  const {
    ordinalAddress,
    ordinalPublicKey,
    paymentPublicKey,
    paymentAddress,
    walletType,
  } = useUserContext();

  // const { collectFeeTokenA } = useCollectFeeTokenA();
  // const { collectFeeTokenB } = useCollectFeeTokenB();
  // const { collectFeeTokenAAmount } = useCollectFeeTokenAAmount();
  // const { collectFeeTokenBAmount } = useCollectFeeTokenBAmount();
  const { collectFeeAmount, setCollectFeeAmount } = useCollectFeeAmount();
  const { collectFeePoolUuid } = useCollectFeePoolUuid();
  const [feeAmount, setFeeAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(DOWN_TIME_FOR_CONFIRM_TX);
  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading; // Update ref whenever isLoading changes
  }, [isLoading]);
  useEffect(() => {
    (async () => {
      const res = await poolApiService.getCollectFeeAmount(
        ordinalAddress,
        collectFeePoolUuid
      );
      setFeeAmount(res);
    })();
  }, [ordinalAddress, collectFeePoolUuid]);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clear the interval when component unmounts
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (seconds === 0) {
      customToast({
        toastType: "error",
        title: "confirm psbt timed out",
      });
      setIsLoading(false);
      setSeconds(DOWN_TIME_FOR_CONFIRM_TX);
    }
  }, [seconds]);

  const handleCollect = async () => {
    setIsLoading(true);
    try {
      const res = await poolApiService.generateCollectFeePsbt(
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
        walletType,
        collectFeePoolUuid
      );

      const { psbt, txId, paymentSignIndexes, taprootSignIndexes } = res;

      const signedPsbt = await signPsbt(
        psbt,
        walletType,
        paymentSignIndexes,
        taprootSignIndexes,
        ordinalAddress,
        paymentAddress
      );
      const txRes = await poolApiService.pushRewardTx(
        signedPsbt,
        txId,
        walletType,
        paymentSignIndexes,
        taprootSignIndexes
      );
      setTransactionId(txRes.txId);
      setTransactionDesc(
        `Collecting Fees: ${stringToDisplay(feeAmount / 10 ** 8)} BTC`
      );
      setTxSubmittedModalOpen(true);
    } catch (error) {
      console.error(error);
    }
    setCollectFeesModalOpen(false);
    setIsLoading(false);
  };
  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex flex-col">
          <div className="mb-10 flex justify-between">
            <div className="invisible">
              <ChevronLeftIcon width={20} className="cursor-pointer" />
            </div>
            <div className="text-[16px] font-bold lg:text-[24px]">
              Collect Fees
            </div>
            <div className="mr-0">
              <XMarkIcon
                width={20}
                className="cursor-pointer"
                onClick={() => setCollectFeesModalOpen(false)}
              />
            </div>
          </div>
          {/* <div className="mb-2 text-[12px] lg:text-[16px]">
            Reward Date: 25/04/2024
          </div>
          <div className="mb-5 text-[10px] lg:text-[14px]  dark:text-[#B7B7B7]">
            Last claim: 30/02/2024 14:57
          </div>
          <div className="mb-3 flex w-full justify-between">
            <div className="text-[12px] lg:text-[16px]">
              Your reward: 0.0000 ETH
            </div>
            <div className="text-[12px] text-[#A7A7A7] lg:text-[14px]">
              About fee
            </div>
          </div>
          <input
            placeholder="Address"
            className="mb-4 h-[47px] w-full cursor-text rounded-[6px] bg-white p-4 font-bold outline-none dark:bg-[#394356]"
          />
          <div className="mb-1 text-[12px] text-[#FF5353] lg:text-[14px]">
            Claim Min-Max (after tax): 300.00 - 1,000.00 ETH
          </div>
          <div className="mb-2 text-[12px] text-[#00FF75] lg:text-[14px]">
            Require ETH in wallet : 100.00 ETH
          </div>
          <div className="mb-5 flex w-full flex-col gap-1 text-[12px] lg:text-[14px]">
            <div className="flex justify-between">
              <div>Fee 5%</div>
              <div>0.00 ETH</div>
            </div>
            <div className="flex justify-between">
              <div>Total earn</div>
              <div>0.00 ETH</div>
            </div>
          </div>
          <div className="mb-14 flex flex-col gap-1 text-[12px] lg:text-[14px]">
            <div>-Fee 5% is calculated from 30/01/2024 13:57</div>
            <div>
              -When claim success the fee will immediately reset to the 1st day
            </div>
          </div> */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={Btc} alt="BTC" width={25} height={25} />
              <div className="text-[12px] lg:text-[16px]">
                {stringToDisplay(feeAmount / 10 ** 8)}
              </div>
            </div>
            <div>BTC</div>
          </div>
          {feeAmount > 0 ? (
            <Button
              placeholder={undefined}
              className="flex w-full justify-center bg-gradient text-[14px] font-bold normal-case  lg:text-[18px]"
              onClick={handleCollect}
              loading={isLoading}
            >
              Collect {isLoading ? `${seconds}s` : null}
            </Button>
          ) : (
            <Button
              placeholder={undefined}
              className="disabled: flex w-full justify-center bg-gradient text-[14px] font-bold normal-case lg:text-[18px]"
              disabled
            >
              Collect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectFeesPanel;
