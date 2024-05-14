import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button, Collapse } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import {
  useAddLiquidityTokenA,
  useAddLiquidityTokenAAmount,
  useAddLiquidityTokenB,
  useAddLiquidityTokenBAmount,
} from "@/state/application/hooks/usePoolHooks";
import { TokenType } from "@/types/type";

type LiquidityPairPanelProps = {
  tokenA: TokenType;
  tokenB: TokenType;
  uuid: string;
  // amount1: number;
  // amount2: number;
  // totalamount: number;
  // sharedpercent: number;
};

const LiquidityPairPanel: React.FC<LiquidityPairPanelProps> = ({
  tokenA,
  tokenB,
  uuid,
  // amount1,
  // amount2,
  // totalamount,
  // sharedpercent,
}) => {
  const { setRemoveLiquidityModalOpen, setAddLiquidityModalOpen } =
    useStatusContext();
  const { ordinalAddress } = useUserContext();
  const { setAddLiquidityTokenA } = useAddLiquidityTokenA();
  const { setAddLiquidityTokenAAmount } = useAddLiquidityTokenAAmount();
  const { setAddLiquidityTokenB } = useAddLiquidityTokenB();
  const { setAddLiquidityTokenBAmount } = useAddLiquidityTokenBAmount();
  const [open, setOpen] = useState(false);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sharedpercent, setSharedpercent] = useState(0);

  const handleAddLiquidity = () => {
    setAddLiquidityModalOpen(true);
    setAddLiquidityTokenA(tokenA);
    setAddLiquidityTokenAAmount(0);
    setAddLiquidityTokenB(tokenB);
    setAddLiquidityTokenBAmount(0);
  };
  useEffect(() => {
    if (ordinalAddress !== "" && uuid !== "") {
      (async () => {
        const resLiquidityAmountInfo =
          await poolApiService.getLiquidityTokenAmount(ordinalAddress, uuid);
        const { tokenAAmount, tokenBAmount, share, userLpTokenAmount } =
          resLiquidityAmountInfo;
        setAmount1(tokenAAmount);
        setAmount2(tokenBAmount);
        setTotalAmount(userLpTokenAmount);
        setSharedpercent(share);
      })();
    }
  }, [uuid]);
  return (
    <div className="mb-4 rounded-lg bg-light-panel p-4 text-[14px] lg:p-8 lg:text-[24px] dark:bg-dark-panel">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Image src={tokenA.imgUrl} alt="tokenimg1" width={50} height={50} />
          <Image
            src={tokenB.imgUrl}
            alt="tokenimg2"
            width={50}
            height={50}
            className="mr-8"
          />
          <div>
            {tokenA.spaced}/{tokenB.spaced}
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
              <div>{totalAmount}</div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {tokenA.spaced}</div>
              <div>
                {amount1} {tokenA.spaced}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {tokenB.spaced}</div>
              <div>
                {amount2} {tokenB.spaced}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Your pool share</div>
              <div>{sharedpercent}%</div>
            </div>
          </div>
          <div className="mt-4 text-center text-dark-primary lg:mt-8">
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
              className="bg-white text-[16px] normal-case text-dark-primary lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
              onClick={handleAddLiquidity}
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
