import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

import { useStatusContext } from "@/context/StatusContext";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useAddLiquidityLpTokenAmount,
  useAddLiquidityPoolUuid,
  useAddLiquidityTokenA,
  useAddLiquidityTokenAAmount,
  useAddLiquidityTokenB,
  useAddLiquidityTokenBAmount,
} from "@/state/application/hooks/usePoolHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import { customToast } from "@/components/toast";
import TxSubmittedModal from "@/components/Modals/TxSubmittedModal";
import { convertWithDecimal } from "@/utils/utils";

const AddLiquidityConfirmPanel = () => {
  const {
    setAddLiquidityConfirmModalOpen,
    setAddLiquidityModalOpen,
    setTxSubmittedModalOpen,
    setTransactionDesc,
    setTransactionId,
  } = useStatusContext();

  const {
    ordinalAddress,
    ordinalPublicKey,
    paymentAddress,
    paymentPublicKey,
    walletType,
  } = useUserContext();

  const { addLiquidityTokenAAmount } = useAddLiquidityTokenAAmount();

  const { addLiquidityTokenA } = useAddLiquidityTokenA();
  const { addLiquidityTokenBAmount } = useAddLiquidityTokenBAmount();

  const { addLiquidityTokenB } = useAddLiquidityTokenB();
  const { addLiquidityPoolUuid } = useAddLiquidityPoolUuid();
  const { addLiquidityLpTokenAmount } = useAddLiquidityLpTokenAmount();

  const [isLoading, setIsLoading] = useState(false);

  const [seconds, setSeconds] = useState(20);
  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading; // Update ref whenever isLoading changes
  }, [isLoading]);
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
      setSeconds(20); // Reset timer to 20 seconds
    }
  }, [seconds]);

  const handleConfirmSupply = async () => {
    try {
      setIsLoading(true);
      const res = await poolApiService.generateAddLiquidityPsbt(
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
        walletType,
        addLiquidityPoolUuid,
        addLiquidityTokenAAmount,
        addLiquidityTokenBAmount
      );
      const { psbt, txId } = res;

      const signedPsbt = await window.unisat.signPsbt(psbt);
      if (!isLoadingRef.current) {
        customToast({
          toastType: "error",
          title: "confirm psbt timed out",
        });
        return;
      }
      const txRes = await poolApiService.pushTx(signedPsbt, txId);
      setTransactionId(txRes.txId);
      setTransactionDesc(
        `Adding liquidity ${addLiquidityTokenAAmount} ${addLiquidityTokenA.spaced} and ${addLiquidityTokenBAmount} ${addLiquidityTokenB.spaced}`
      );
      setTxSubmittedModalOpen(true);

      // customToast({
      //   toastType: "success",
      //   title: "Add liquidity success",
      //   link: `https://mempool.space/testnet/tx/${txRes.txId}`,
      // });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setAddLiquidityConfirmModalOpen(false);
    setAddLiquidityModalOpen(false);
  };

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <ChevronLeftIcon width={20} className="cursor-pointer" />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            You Will Receive
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => setAddLiquidityConfirmModalOpen(false)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:mt-8">
          <div className="text-[16px] font-semibold lg:text-[24px]">
            {addLiquidityLpTokenAmount / 10 ** 8}
          </div>
          <div className="text-[12px] lg:text-[16px]">
            {addLiquidityTokenA.spaced}/{addLiquidityTokenB.spaced} Pool Tokens
          </div>
          {/* <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
            Output is estimated. If the price changes by more than 0.5% your
            transaction revert
          </div> */}
          <div className="flex flex-col gap-2 text-[12px] lg:text-[16px]">
            <div className="flex items-center justify-between">
              <div>{addLiquidityTokenA.spaced} Deposited</div>
              <div className="flex items-center gap-4">
                <Image
                  src={addLiquidityTokenA.imgUrl}
                  alt={addLiquidityTokenA.name}
                  width={24}
                  height={24}
                />
                <div>
                  {convertWithDecimal(
                    addLiquidityTokenAAmount,
                    addLiquidityTokenA
                  )}{" "}
                  {addLiquidityTokenA.symbol}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>{addLiquidityTokenB.spaced} Deposited</div>
              <div className="flex items-center gap-4">
                <Image
                  src={addLiquidityTokenB.imgUrl}
                  alt={addLiquidityTokenB.name}
                  width={24}
                  height={24}
                />
                <div>
                  {addLiquidityTokenBAmount} {addLiquidityTokenB.symbol}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[12px] lg:text-[16px]">
            <div>Rates</div>
            <div className="flex flex-col gap-2">
              <div>
                1 {addLiquidityTokenA.spaced} ={" "}
                {(
                  (addLiquidityTokenBAmount / addLiquidityTokenAAmount) *
                  10 **
                    (addLiquidityTokenB.divisibility -
                      addLiquidityTokenA.divisibility)
                ).toFixed(5)}{" "}
                {addLiquidityTokenB.spaced}
              </div>
              <div>
                1 {addLiquidityTokenB.spaced} ={" "}
                {(
                  (addLiquidityTokenAAmount / addLiquidityTokenBAmount) *
                  10 **
                    (addLiquidityTokenA.divisibility -
                      addLiquidityTokenB.divisibility)
                ).toFixed(5)}{" "}
                {addLiquidityTokenA.spaced}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          {!isLoading ? (
            <Button
              className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
              placeholder={undefined}
              onClick={() => handleConfirmSupply()}
            >
              Confirm Supply
            </Button>
          ) : (
            <Button
              className="flex w-full justify-center bg-gradient text-[16px] normal-case lg:text-[24px]"
              loading
              placeholder={undefined}
              onClick={() => handleConfirmSupply()}
            >
              Confirm Supply {seconds}s
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8 text-center text-[12px] text-white lg:text-[16px]">
        By adding liquidity earn 0.3% of all trades on this pair proportional to
        your share of the pool. Fees are added to the pool, accrue in real time
        and can be claimed by withdrawing your liquidity
      </div>
    </div>
  );
};

export default AddLiquidityConfirmPanel;
