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
  useCollectFeeAmount,
  useCollectFeePoolUuid,
  // useCollectFeeTokenA,
  // useCollectFeeTokenAAmount,
  // useCollectFeeTokenB,
  // useCollectFeeTokenBAmount,
  useRemoveLiquidityLpTokenAmount,
  useRemoveLiquidityPoolUuid,
  useRemoveLiquiditySharePercent,
  useRemoveLiquidityTokenA,
  useRemoveLiquidityTokenAAmount,
  useRemoveLiquidityTokenB,
  useRemoveLiquidityTokenBAmount,
} from "@/state/application/hooks/usePoolHooks";
import { TokenType } from "@/types/type";
import { convertWithDecimal, stringToDisplay } from "@/utils/utils";

type LiquidityPairPanelProps = {
  tokenA: TokenType;
  tokenB: TokenType;
  uuid: string;
  // amount1: number;
  // amount2: number;
  // totalamount: number;
  // sharedpercent: number;
};

const lpdecimal = 8;
const LiquidityPairPanel: React.FC<LiquidityPairPanelProps> = ({
  tokenA,
  tokenB,
  uuid,
  // amount1,
  // amount2,

  // totalamount,
  // sharedpercent,
}) => {
  const {
    setRemoveLiquidityModalOpen,
    setAddLiquidityModalOpen,
    setCollectFeesModalOpen,
  } = useStatusContext();
  const { ordinalAddress } = useUserContext();
  const { setAddLiquidityTokenA } = useAddLiquidityTokenA();
  const { setAddLiquidityTokenAAmount } = useAddLiquidityTokenAAmount();
  const { setAddLiquidityTokenB } = useAddLiquidityTokenB();
  const { setAddLiquidityTokenBAmount } = useAddLiquidityTokenBAmount();
  const { setRemoveLiquidityTokenA } = useRemoveLiquidityTokenA();
  const { setRemoveLiquidityTokenAAmount } = useRemoveLiquidityTokenAAmount();
  const { setRemoveLiquidityTokenB } = useRemoveLiquidityTokenB();
  const { setRemoveLiquidityTokenBAmount } = useRemoveLiquidityTokenBAmount();
  const { setRemoveLiquiditySharePercent } = useRemoveLiquiditySharePercent();
  const { setRemoveLiquidityLpTokenAmount } = useRemoveLiquidityLpTokenAmount();
  const { setRemoveLiquidityPoolUuid } = useRemoveLiquidityPoolUuid();

  // const { setCollectFeeTokenA } = useCollectFeeTokenA();
  // const { setCollectFeeTokenB } = useCollectFeeTokenB();
  // // const { setCollectFeeTokenAAmount } = useCollectFeeTokenAAmount();
  // const { setCollectFeeTokenBAmount } = useCollectFeeTokenBAmount();
  const { setCollectFeePoolUuid } = useCollectFeePoolUuid();
  const { collectFeeAmount, setCollectFeeAmount } = useCollectFeeAmount();

  const [open, setOpen] = useState(false);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sharedpercent, setSharedpercent] = useState(0);
  const [liquidityCollectFeeAmount, setLiquidityCollectFeeAmount] = useState(0);

  const handleAddLiquidity = () => {
    setAddLiquidityModalOpen(true);
    setAddLiquidityTokenA(tokenA);
    setAddLiquidityTokenAAmount(0);
    setAddLiquidityTokenB(tokenB);
    setAddLiquidityTokenBAmount(0);
  };
  const handleRemoveLiquidity = () => {
    setRemoveLiquidityModalOpen(true);
    setRemoveLiquidityTokenA(tokenA);
    setRemoveLiquidityTokenAAmount(amount1);
    setRemoveLiquidityTokenB(tokenB);
    setRemoveLiquidityTokenBAmount(amount2);
    setRemoveLiquiditySharePercent(sharedpercent);
    setRemoveLiquidityLpTokenAmount(totalAmount);
    setRemoveLiquidityPoolUuid(uuid);
  };
  const handleCollectFeesLiquidity = () => {
    // setCollectFeeTokenA(tokenA);
    // setCollectFeeTokenB(tokenB);
    setCollectFeePoolUuid(uuid);
    setCollectFeesModalOpen(true);
    setCollectFeeAmount(liquidityCollectFeeAmount);
  };
  useEffect(() => {
    if (ordinalAddress !== "" && uuid !== "" && open && amount1 === 0) {
      (async () => {
        let resLiquidityAmountInfo;
        try {
          resLiquidityAmountInfo = await poolApiService.getLiquidityTokenAmount(
            ordinalAddress,
            uuid
          );
        } catch (error) {
          console.log(error);
        }
        const { tokenAAmount, tokenBAmount, share, userLpTokenAmount } =
          resLiquidityAmountInfo;
        setAmount1(tokenAAmount);
        setAmount2(tokenBAmount);
        setTotalAmount(userLpTokenAmount);
        setSharedpercent(share);
      })();
      (async () => {
        const resCollectedFee = await poolApiService.getCollectFeeAmount(
          ordinalAddress,
          uuid
        );
        setLiquidityCollectFeeAmount(resCollectedFee);
      })();
    }
  }, [uuid, ordinalAddress, open]);

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
              <div>Your total LP tokens</div>
              <div>{stringToDisplay(totalAmount / 10 ** 8)}</div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {tokenA.spaced}</div>
              <div>
                {stringToDisplay(convertWithDecimal(amount1, tokenA))}{" "}
                {tokenA.symbol}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Pooled {tokenB.spaced}</div>
              <div>
                {stringToDisplay(convertWithDecimal(amount2, tokenB))}{" "}
                {tokenB.symbol}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Your pool share</div>
              <div>{sharedpercent}%</div>
            </div>
            <div className="flex justify-between">
              <div>Collected Fees</div>
              <div>
                {stringToDisplay(liquidityCollectFeeAmount / 10 ** 8)}BTC
              </div>
            </div>
          </div>
          {/* <div className="mt-4 text-center text-dark-primary lg:mt-8">
            View Accrued Fees and Analytics
          </div> */}
          <div className="mt-8 flex items-center justify-between gap-5 lg:mt-12">
            <Button
              className="w-60 flex-1 bg-white text-[16px] normal-case text-primary lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
              onClick={handleRemoveLiquidity}
            >
              Remove
            </Button>
            <Button
              className="w-60 flex-1 bg-white text-[16px] normal-case text-dark-primary lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
              onClick={handleAddLiquidity}
            >
              Add
            </Button>
            <Button
              className="w-60 flex-1 bg-white text-[16px] normal-case text-[#B0B0B0EB] lg:text-[24px] dark:bg-dark-item"
              placeholder={undefined}
              onClick={handleCollectFeesLiquidity}
            >
              Collect Fees
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default LiquidityPairPanel;
