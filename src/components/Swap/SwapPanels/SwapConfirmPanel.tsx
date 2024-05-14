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
} from "@/state/application/hooks/useSwapHooks";
import { useUserContext } from "@/context/UserContext";
import poolApiService from "@/api.services/pool/pool.api.service";
import SwapTxSubmittedModal from "../SwapModals/SwapTxSubmittedModal";
import { useState } from "react";

const SwapConfirmPanel = () => {
  const { setSwapConfirmModalOpen, setSwapTxSubmittedModalOpen } =
    useStatusContext();

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

  const [swapTxId, setSwapTxId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const { psbt, txId } = res;

      const signedPsbt = await window.unisat.signPsbt(psbt);
      const txRes = await poolApiService.pushTx(signedPsbt, txId);
      setSwapTxId(txRes.txId);
      setSwapTxSubmittedModalOpen(true);
    } catch (error) {}
    // setSwapConfirmModalOpen(false);
    // setTxSubmittedModalOpen(true);
    setIsLoading(false);
  };

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
            {sendTokenAmount}
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
            {receiveTokenAmount}
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
      <div className="text-[12px] text-light-gray-font lg:text-[14px] lg:text-[16px] dark:text-dark-gray-font">
        Output is estimated. If the price changes by more than 0.5% your
        transaction will revert
      </div>
      <div className="flex flex-col gap-2 text-[12px] lg:gap-4 lg:text-[14px]">
        <div className="flex items-center justify-between ">
          <div>Price</div>
          <div className="flex items-center gap-1">
            <div>0.00027 ETH per 1 EOS</div>
            <ArrowsUpDownIcon width={20} />
          </div>
        </div>
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
            <div>9.741 EOS</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Price Impact</div>
            <CustomTooltip
              content="The difference between the market price and estimated price
              due to trade size"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>0.01%</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Liquidity Provider Fee</div>

            <CustomTooltip
              content="A portion of each trade (0.30%) goes to liquidity providers as
              a protocol incentive"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>0.0000066 ETH</div>
          </div>
        </div>
      </div>
      <Button
        placeholder={undefined}
        className="mt-4 flex justify-center bg-gradient text-[16px] font-bold normal-case lg:text-[18px]"
        onClick={() => handleConfirmSwap()}
        loading={isLoading}
      >
        Confirm
      </Button>
      <SwapTxSubmittedModal txId={swapTxId} />
    </div>
  );
};

export default SwapConfirmPanel;
