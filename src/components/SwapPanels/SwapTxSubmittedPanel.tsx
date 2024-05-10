import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import ArrowTopRight from "@/assets/imgs/arrow-top-right.svg";
import ArrowTopRightBlack from "@/assets/imgs/arrow-top-right-black.svg";
import { Button } from "@material-tailwind/react";
import { useThemeContext } from "@/context/ThemeContext";
import {
  useReceiveToken,
  useReceiveTokenAmount,
  useSendToken,
  useSendTokenAmount,
} from "@/state/application/hooks/useSwapHooks";

type Props = {
  txId: string;
};

const SwapTxSubmittedPanel: React.FC<Props> = ({ txId }) => {
  const { setSwapTxSubmittedModalOpen, setSwapConfirmModalOpen } =
    useStatusContext();
  const { darkMode } = useThemeContext();

  const { sendToken } = useSendToken();
  const { receiveToken } = useReceiveToken();
  const { sendTokenAmount } = useSendTokenAmount();
  const { receiveTokenAmount } = useReceiveTokenAmount();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <XMarkIcon
          width={20}
          className="cursor-pointer"
          onClick={() => {
            setSwapTxSubmittedModalOpen(false);
            setSwapConfirmModalOpen(false);
          }}
        />
      </div>
      <div>
        <Image
          src={darkMode ? ArrowTopRight : ArrowTopRightBlack}
          alt="arrow-top-right"
          className="mx-auto"
        />
      </div>
      <div className="mt-4 text-center text-[16px] font-bold lg:text-[24px]">
        Transaction Submitted
      </div>
      <div className="text-center text-[12px] lg:text-[14px]">
        Swapping {sendTokenAmount} {sendToken.spaced} for {receiveTokenAmount}{" "}
        {receiveToken.spaced}
      </div>
      <div className="mt-4">
        <a href={`https://mempool.space/testnet/tx/${txId}`} target="_blank">
          <Button
            placeholder={undefined}
            className="w-full bg-light-tooltip-bg text-[16px] font-bold normal-case text-primary lg:text-[18px] dark:bg-dark-tooltip-bg dark:text-dark-primary"
          >
            View in Mempool
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SwapTxSubmittedPanel;
