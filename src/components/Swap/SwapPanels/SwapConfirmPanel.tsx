import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import Eth from "@/assets/imgs/ETH.svg";
import Eos from "@/assets/imgs/EOS.svg";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";
import CustomTooltip from "@/components/Tooltip";
import {
  useReceiveToken,
  useReceiveTokenAmount,
  useSendToken,
  useSendTokenAmount,
  useSlippage,
} from "@/state/application/hooks/useSwapHooks";
import { useUserContext } from "@/context/UserContext";
import poolApiService from "@/api.services/pool/pool.api.service";
import TxSubmittedModal from "../../Modals/TxSubmittedModal";
import { useEffect, useRef, useState } from "react";
import { customToast } from "@/components/toast";
import { convertWithDecimal, signPsbt, stringToDisplay } from "@/utils/utils";
import { DOWN_TIME_FOR_CONFIRM_TX } from "@/configs/constants";

const SwapConfirmPanel = () => {
  const {
    setSwapConfirmModalOpen,
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

  const { sendToken } = useSendToken();
  const { receiveToken } = useReceiveToken();
  const { sendTokenAmount } = useSendTokenAmount();
  const { receiveTokenAmount } = useReceiveTokenAmount();
  const { slippage } = useSlippage();

  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(DOWN_TIME_FOR_CONFIRM_TX);

  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading; // Update ref whenever isLoading changes
  }, [isLoading]);

  const handleConfirmSwap = async () => {
    setIsLoading(true);
    try {
      const res = await poolApiService.generateSwapPsbt(
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
        walletType,
        sendToken.uuid,
        receiveToken.uuid,
        sendTokenAmount,
        receiveTokenAmount
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
        `Swapping ${convertWithDecimal(sendTokenAmount, sendToken)} ${sendToken.spaced} for ${convertWithDecimal(receiveTokenAmount, receiveToken)} ${receiveToken.spaced}`
      );
      setTxSubmittedModalOpen(true);
    } catch (error) {
      console.error(error);
    }
    setSwapConfirmModalOpen(false);
    // setTxSubmittedModalOpen(true);
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
    <div className="flex flex-col gap-2 px-4 lg:gap-4">
      <div className="flex items-center justify-between">
        <div className="invisible">
          <XMarkIcon width={20} />
        </div>
        <div className="text-[24px]">Confirm Swap</div>
        <div>
          <XMarkIcon
            width={20}
            className="cursor-pointer"
            onClick={() => setSwapConfirmModalOpen(false)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] lg:text-[16px]">Swap from</div>
          <div className="text-[16px] font-semibold lg:text-[24px]">
            {stringToDisplay(convertWithDecimal(sendTokenAmount, sendToken))}
            {/* {sendTokenAmount} */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={sendToken.imgUrl}
            alt={sendToken.name}
            width={24}
            height={24}
          />
          <div className="text-[12px] lg:text-[16px]">{sendToken.spaced}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] lg:text-[16px]">Swap to</div>
          <div className="text-[16px] font-semibold lg:text-[24px]">
            {stringToDisplay(
              convertWithDecimal(receiveTokenAmount, receiveToken)
            )}
            {/* {receiveTokenAmount} */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={receiveToken.imgUrl}
            alt={receiveToken.name}
            width={24}
            height={24}
          />
          <div className="text-[12px] lg:text-[16px]">
            {receiveToken.spaced}
          </div>
        </div>
      </div>
      <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
        Output is estimated. If the price changes by more than {slippage}% your
        transaction will revert
      </div>
      <div className="flex flex-col gap-2 text-[12px] lg:gap-4 lg:text-[14px]">
        {/* <div className="flex items-center justify-between ">
          <div>Price</div>
          <div className="flex items-center gap-1">
            <div>
              {(receiveTokenAmount / sendTokenAmount).toFixed(5)}{" "}
              {receiveToken.symbol} per 1 {sendToken.symbol}
            </div>
            <ArrowsUpDownIcon width={20} />
          </div>
        </div> */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Minimum received</div>
            <CustomTooltip
              content="Your transaction will revert if there is a large, unfavorable
                price movement before it is confirmed"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>{`${stringToDisplay(convertWithDecimal(receiveTokenAmount - (receiveTokenAmount / 100) * slippage, receiveToken))} ${receiveToken.symbol}`}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>slippage</div>
            <CustomTooltip
              content="The difference between the market price and estimated price
              due to trade size"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>{slippage}%</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Swap Fee</div>

            <CustomTooltip
              content="A portion of each trade goes to liquidity providers as
              a protocol incentive"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>1.5% fee</div>
          </div>
        </div>
      </div>
      <Button
        placeholder={undefined}
        className="mt-4 flex justify-center bg-gradient text-[16px] font-bold normal-case lg:text-[18px]"
        onClick={() => handleConfirmSwap()}
        loading={isLoading}
      >
        Confirm {isLoading ? `${seconds}s` : null}
      </Button>
    </div>
  );
};

export default SwapConfirmPanel;
