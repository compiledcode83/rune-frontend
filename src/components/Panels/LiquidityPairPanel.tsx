import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button, Collapse } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";

type LiquidityPairPanelProps = {
  img1: string;
  img2: string;
  token1: string;
  token2: string;
  amount1: number;
  amount2: number;
  totalamount: number;
  sharedpercent: number;
};

const LiquidityPairPanel: React.FC<LiquidityPairPanelProps> = ({
  img1,
  img2,
  token1,
  token2,
  amount1,
  amount2,
  totalamount,
  sharedpercent,
}) => {
  const { setRemoveLiquidityModalOpen } = useStatusContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 rounded-lg bg-light-panel p-4 text-[14px] lg:p-8 lg:text-[24px] dark:bg-dark-panel">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Image src={img1} alt="tokenimg1" />
          <Image src={img2} alt="tokenimg2" />
          <div>
            {token1}/{token2}
          </div>
        </div>
        <ChevronDownIcon
          className={`text-primary ${open && "scale-y-[-1]"}`}
          width={20}
        />
      </div>
      <Collapse open={open}>
        <div className="mt-4">
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex justify-between">
              <div>Your total pool tokens</div>
              <div>{totalamount}</div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {token1}</div>
              <div>
                {amount1} {token1}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {token2}</div>
              <div>
                {amount2} {token2}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Your pool share</div>
              <div>{sharedpercent}%</div>
            </div>
          </div>
          <div className="text-dark-primary mt-4 text-center lg:mt-8">
            View Accrued Fees and Analytics
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 lg:mt-12">
            <Button
              className="bg-white text-[16px] normal-case text-primary lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
              onClick={() => setRemoveLiquidityModalOpen(true)}
            >
              Remove
            </Button>
            <Button
              className="text-dark-primary bg-white text-[16px] normal-case lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
            >
              Add
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default LiquidityPairPanel;
