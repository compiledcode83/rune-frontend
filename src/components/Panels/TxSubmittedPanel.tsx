import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import ArrowTopRight from "@/assets/imgs/arrow-top-right.svg";
import ArrowTopRightBlack from "@/assets/imgs/arrow-top-right-black.svg";
import { Button } from "@material-tailwind/react";
import { useThemeContext } from "@/context/ThemeContext";

const TxSubmittedPanel = () => {
  const { setTxSubmittedModalOpen } = useStatusContext();
  const { darkMode } = useThemeContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <XMarkIcon
          width={20}
          className="cursor-pointer"
          onClick={() => setTxSubmittedModalOpen(false)}
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
        Swapping 0.022 ETH for 82.89 EOS
      </div>
      <div className="mt-4">
        <Button
          placeholder={undefined}
          className="dark:text-dark-primary bg-light-tooltip-bg dark:bg-dark-tooltip-bg w-full text-[16px] font-bold normal-case text-primary lg:text-[18px]"
        >
          View in Mempool
        </Button>
      </div>
    </div>
  );
};

export default TxSubmittedPanel;
