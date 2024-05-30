import React, { useEffect, useRef, useState } from "react";
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
import SettingPanel from "../../Panels/SettingPanel";
import { useStatusContext } from "@/context/StatusContext";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useUserContext } from "@/context/UserContext";
import poolApiService from "@/api.services/pool/pool.api.service";
import {
  useRemoveLiquidityLpTokenAmount,
  useRemoveLiquiditySharePercent,
  useRemoveLiquidityTokenA,
  useRemoveLiquidityTokenAAmount,
  useRemoveLiquidityTokenB,
  useRemoveLiquidityTokenBAmount,
  useRemoveLiquidityPoolUuid,
} from "@/state/application/hooks/usePoolHooks";
import { customToast } from "@/components/toast";
import { convertWithDecimal, signPsbt, stringToDisplay } from "@/utils/utils";
import { DOWN_TIME_FOR_CONFIRM_TX } from "@/configs/constants";
const lpdecimal = 8;

const RemoveLiquidityConfirmPanel = () => {
  const {
    setRemoveLiquidityConfirmModalOpen,
    setRemoveLiquidityModalOpen,
    setTransactionId,
    setTransactionDesc,
    setTxSubmittedModalOpen,
  } = useStatusContext();
  const {
    ordinalAddress,
    ordinalPublicKey,
    paymentPublicKey,
    paymentAddress,
    walletType,
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const { removeLiquidityTokenA } = useRemoveLiquidityTokenA();
  const { removeLiquidityTokenAAmount } = useRemoveLiquidityTokenAAmount();
  const { removeLiquidityTokenB } = useRemoveLiquidityTokenB();
  const { removeLiquidityTokenBAmount } = useRemoveLiquidityTokenBAmount();
  const { removeLiquiditySharePercent } = useRemoveLiquiditySharePercent();
  const { removeLiquidityLpTokenAmount } = useRemoveLiquidityLpTokenAmount();
  const { removeLiquidityPoolUuid } = useRemoveLiquidityPoolUuid();
  const [seconds, setSeconds] = useState(DOWN_TIME_FOR_CONFIRM_TX);
  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading; // Update ref whenever isLoading changes
  }, [isLoading]);
  const handleConfirmRemove = async () => {
    setIsLoading(true);
    try {
      const res = await poolApiService.generateRemoveLiquidityPsbt(
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
        walletType,
        removeLiquidityPoolUuid
      );
      const { psbt, txId, paymentSignIndexes, taprootSignIndexes } = res;

      const signedPsbt = await await signPsbt(
        psbt,
        walletType,
        paymentSignIndexes,
        taprootSignIndexes,
        ordinalAddress,
        paymentAddress
      );
      if (!isLoadingRef.current) {
        customToast({
          toastType: "error",
          title: "confirm psbt timed out",
        });
        return;
      }
      const txRes = await poolApiService.pushTx(
        signedPsbt,
        txId,
        walletType,
        paymentSignIndexes,
        taprootSignIndexes
      );
      setTransactionId(txRes.txId);
      setTransactionDesc(
        `Removing pool ${removeLiquidityTokenA.spaced} / ${removeLiquidityTokenB.spaced}`
      );
      setTxSubmittedModalOpen(true);
    } catch (error) {
      console.error(error);
    }
    setRemoveLiquidityConfirmModalOpen(false);
    setRemoveLiquidityModalOpen(false);
    setIsLoading(false);
  };

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
      setSeconds(DOWN_TIME_FOR_CONFIRM_TX); // Reset timer to 20 seconds
    }
  }, [seconds]);

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
              onClick={() => setRemoveLiquidityConfirmModalOpen(false)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:mt-8">
          <div className="flex flex-col gap-2 text-[12px] lg:text-[16px]">
            <div className="flex items-center justify-between">
              <div>{removeLiquidityTokenA.spaced} Deposited</div>
              <div className="flex items-center gap-4">
                <Image
                  src={removeLiquidityTokenA.imgUrl}
                  alt={removeLiquidityTokenA.name}
                  width={24}
                  height={24}
                />
                <div>
                  {stringToDisplay(
                    convertWithDecimal(
                      removeLiquidityTokenAAmount,
                      removeLiquidityTokenA
                    )
                  )}{" "}
                  {removeLiquidityTokenA.symbol}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>{removeLiquidityTokenB.spaced} Deposited</div>
              <div className="flex items-center gap-4">
                <Image
                  src={removeLiquidityTokenB.imgUrl}
                  alt={removeLiquidityTokenB.name}
                  width={24}
                  height={24}
                />
                <div>
                  {stringToDisplay(
                    convertWithDecimal(
                      removeLiquidityTokenBAmount,
                      removeLiquidityTokenB
                    )
                  )}{" "}
                  {removeLiquidityTokenB.symbol}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
            Output is estimated. If the price changes by more than 0.5% your
            transaction revert
          </div> */}
          <div className="flex flex-col gap-2 rounded-lg bg-light-item p-4 text-[12px] lg:text-[16px] dark:bg-dark-item">
            <div className="flex justify-between">
              <div>LP token</div>
              <div className="flex justify-center gap-2">
                <div>
                  {stringToDisplay(removeLiquidityLpTokenAmount / 10 ** 8)}
                </div>
                <Image
                  src={removeLiquidityTokenA.imgUrl}
                  width={24}
                  height={24}
                  alt={removeLiquidityTokenA.name}
                />
                <Image
                  src={removeLiquidityTokenB.imgUrl}
                  width={24}
                  height={24}
                  alt={removeLiquidityTokenB.name}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Price</div>
              <div className="flex flex-col items-end gap-2">
                <div>
                  1 {removeLiquidityTokenA.spaced} ={" "}
                  {stringToDisplay(
                    (removeLiquidityTokenAAmount /
                      removeLiquidityTokenBAmount) *
                      10 **
                        (removeLiquidityTokenA.divisibility -
                          removeLiquidityTokenB.divisibility)
                  )}{" "}
                  {removeLiquidityTokenB.spaced}
                </div>
                <div>
                  1 {removeLiquidityTokenB.spaced} ={" "}
                  {stringToDisplay(
                    (removeLiquidityTokenBAmount /
                      removeLiquidityTokenAAmount) *
                      10 **
                        (removeLiquidityTokenB.divisibility -
                          removeLiquidityTokenA.divisibility)
                  )}{" "}
                  {removeLiquidityTokenA.spaced}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>Share of Pool</div>
              <div>{removeLiquiditySharePercent}%</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="flex w-full justify-center bg-gradient text-[16px] normal-case lg:text-[24px]"
            placeholder={undefined}
            onClick={() => handleConfirmRemove()}
            loading={isLoading}
          >
            Confirm Remove {isLoading ? `${seconds}s` : null}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidityConfirmPanel;
