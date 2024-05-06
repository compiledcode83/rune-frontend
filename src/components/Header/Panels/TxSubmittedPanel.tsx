import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import ArrowTopRight from "@/assets/imgs/arrow-top-right.svg";
import { Button } from "@material-tailwind/react";

const TxSubmittedPanel = () => {
  const { setTxSubmittedModalOpen } = useStatusContext();

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
        <Image src={ArrowTopRight} alt="arrow-top-right" className="mx-auto" />
      </div>
      <div className="mt-4 text-center text-[24px] font-bold">
        Transaction Submitted
      </div>
      <div className="text-center text-[14px]">
        Swapping 0.022 ETH for 82.89 EOS
      </div>
      <div className="mt-4">
        <Button
          placeholder={undefined}
          className="w-full bg-[#394356] text-[18px] font-bold normal-case text-[#EAAC33]"
        >
          View in Mempool
        </Button>
      </div>
    </div>
  );
};

export default TxSubmittedPanel;
