import React, { useEffect, useState } from "react";
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
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { BalanceType, TokenType } from "@/types/type";

import {
  usePoolTokens,
  useSwapableTokens,
  useTokenBalances,
} from "@/state/application/hooks/useSwapHooks";
import {
  useAddLiquidityToken1,
  useAddLiquidityToken1Amount,
  useAddLiquidityToken2,
  useAddLiquidityToken2Amount,
} from "@/state/application/hooks/usePoolHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";

const AddLiquidityPanel = () => {
  const {
    setAddLiquidityModalOpen,
    setAddLiquidityConfirmModalOpen,
    setAddLiquiditySelectToken1ModalOpen,
    setAddLiquiditySelectToken2ModalOpen,
    setConnectWalletModalOpen,
  } = useStatusContext();

  const { ordinalAddress } = useUserContext();

  const { poolTokens, setPoolTokens } = usePoolTokens();
  const { swapableTokens, setSwapableTokens } = useSwapableTokens();
  const { addLiquidityToken1, setAddLiquidityToken1 } = useAddLiquidityToken1();
  const { addLiquidityToken2, setAddLiquidityToken2 } = useAddLiquidityToken2();

  const { addLiquidityToken1Amount, setAddLiquidityToken1Amount } =
    useAddLiquidityToken1Amount();
  const { addLiquidityToken2Amount, setAddLiquidityToken2Amount } =
    useAddLiquidityToken2Amount();
  const { tokenBalances, setTokenBalances } = useTokenBalances();

  const [addLiquidityToken1Balance, setAddLiquidityToken1Balance] = useState(0);
  const [addLiquidityToken2Balance, setAddLiquidityToken2Balance] = useState(0);

  useEffect(() => {
    (async () => {
      if (addLiquidityToken1.uuid === "") {
        try {
          const resPoolTokens = await poolApiService.getPoolTokens();
          if (resPoolTokens.length < 2)
            throw new Error("there must be more than 1 token");
          setAddLiquidityToken1(resPoolTokens[0]);
          setPoolTokens(resPoolTokens);
        } catch (error) {
          console.error((error as Error).message);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (ordinalAddress !== "") {
        console.log({ ordinalAddress }, { poolTokens });
        try {
          const resTokenBalances: BalanceType[] =
            await poolApiService.getBalance(ordinalAddress);
          setTokenBalances(resTokenBalances);
        } catch (error) {
          console.error((error as Error).message);
        }
      } else {
        setTokenBalances([]);
      }
    })();
  }, [ordinalAddress, poolTokens]);

  useEffect(() => {
    if (addLiquidityToken1.runeId === "") {
      setAddLiquidityToken1Amount(0);
      setAddLiquidityToken1Balance(0);
    } else {
      const newBalance = tokenBalances.find(
        (tokenBalance) => tokenBalance.runeId === addLiquidityToken1.runeId
      );
      if (newBalance) {
        setAddLiquidityToken1Balance(newBalance.amount);
      } else {
        setAddLiquidityToken1Balance(0);
      }
    }
  }, [addLiquidityToken1, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    if (addLiquidityToken2.runeId === "") {
      setAddLiquidityToken2Amount(0);
      setAddLiquidityToken2Balance(0);
    } else {
      const newBalance = tokenBalances.find(
        (tokenBalance) => tokenBalance.runeId === addLiquidityToken1.runeId
      );
      if (newBalance) {
        setAddLiquidityToken2Balance(newBalance.amount);
      } else {
        setAddLiquidityToken2Balance(0);
      }
    }
  }, [addLiquidityToken1, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    const newBalance = tokenBalances.find(
      (tokenBalance) => tokenBalance.runeId === addLiquidityToken2.runeId
    );
    if (newBalance) {
      setAddLiquidityToken2Balance(newBalance.amount);
    } else {
      setAddLiquidityToken2Balance(0);
    }
  }, [addLiquidityToken2, ordinalAddress, poolTokens, tokenBalances]);

  // const handleAddLiquidityToken1Amount = (amount: number) => {
  //   setAddLiquidityToken1Amount(amount);
  // };

  const handleAddLiquidityConfirmModalOpen = () => {
    setAddLiquidityConfirmModalOpen(true);
  };

  const AddLiquidityButton = () => {
    if (ordinalAddress === "") {
      return (
        <Button
          className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
          placeholder={undefined}
          onClick={() => setConnectWalletModalOpen(true)}
        >
          Connect Wallet
        </Button>
      );
    } else if (
      addLiquidityToken1.runeId === "" ||
      addLiquidityToken2.runeId === ""
    ) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Select a Token
        </Button>
      );
    } else if (
      addLiquidityToken1Amount === 0 ||
      addLiquidityToken2Amount === 0
    ) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Input amount
        </Button>
      );
    } else if (
      addLiquidityToken1Amount > addLiquidityToken1Balance ||
      addLiquidityToken2Amount > addLiquidityToken2Balance
    ) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Insufficient Ballance
        </Button>
      );
    } else {
      return (
        <Button
          className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
          placeholder={undefined}
          onClick={() => handleAddLiquidityConfirmModalOpen()}
        >
          Supply
        </Button>
      );
    }
  };

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <ChevronLeftIcon width={20} className="cursor-pointer" />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            Add Liquidity
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => setAddLiquidityModalOpen(false)}
            />
          </div>
        </div>
        <div className="relative mt-4 lg:mt-8">
          <div className="">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] lg:text-[16px]">Input</div>
                <div>
                  <input
                    className="w-[150px] bg-transparent outline-none focus:overflow-hidden"
                    value={addLiquidityToken1Amount}
                    onChange={(e) =>
                      setAddLiquidityToken1Amount(Number(e.target.value))
                    }
                    type="number"
                  />
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance:
                  {addLiquidityToken1.runeId === "" || ordinalAddress === ""
                    ? " -"
                    : addLiquidityToken1Balance}
                </div>
              </div>
              {addLiquidityToken1.runeId === "" ? (
                <Button
                  placeholder={undefined}
                  className="bg-gradient font-bold"
                  onClick={() => setAddLiquiditySelectToken1ModalOpen(true)}
                >
                  Select Token
                </Button>
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                  onClick={() => setAddLiquiditySelectToken1ModalOpen(true)}
                >
                  <Image
                    src={addLiquidityToken1.imgUrl}
                    alt={addLiquidityToken1.name}
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] lg:text-[14px]">
                    {addLiquidityToken1.name}
                  </div>
                  <Image src={ArrowDown} alt="arrow" />
                </div>
              )}
            </div>
          </div>
          <div className="my-8 h-[1px] bg-[#535358]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[2px] border-light-panel bg-light-item p-2 dark:border-dark-panel dark:bg-dark-item">
              <Image src={Arrow2} alt="exchangearrow" />
            </div>
          </div>
          <div className="">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] lg:text-[16px]">Input</div>
                <div>
                  <input
                    className="w-[150px] bg-transparent outline-none focus:overflow-hidden"
                    value={addLiquidityToken2Amount}
                    onChange={(e) =>
                      setAddLiquidityToken2Amount(Number(e.target.value))
                    }
                    type="number"
                  />
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance:
                  {addLiquidityToken2.runeId === "" || ordinalAddress === ""
                    ? " -"
                    : addLiquidityToken2Balance}
                </div>
              </div>
              {addLiquidityToken2.runeId === "" ? (
                <Button
                  placeholder={undefined}
                  className="bg-gradient font-bold"
                  onClick={() => {
                    setAddLiquiditySelectToken2ModalOpen(true);
                    console.log("setAddLiquiditySelectToken2ModalOpen");
                  }}
                >
                  Select Token
                </Button>
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                  onClick={() => setAddLiquiditySelectToken2ModalOpen(true)}
                >
                  <Image
                    src={addLiquidityToken2.imgUrl}
                    alt={addLiquidityToken2.name}
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] lg:text-[14px]">
                    {addLiquidityToken2.name}
                  </div>
                  <Image src={ArrowDown} alt="arrow" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 text-[12px] lg:mt-4 lg:text-[14px]">
          <div className="flex items-center justify-between">
            <div>Share of Pool</div>
            <div>0.14%</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Price</div>
            <div>0.00027 ETH per 1 EOS</div>
          </div>
        </div>
        <div className="mt-8">{AddLiquidityButton()}</div>
      </div>
      <div className="mt-8 text-center text-[12px] text-white lg:text-[16px]">
        By adding liquidity earn 0.3% of all trades on this pair proportional to
        your share of the pool. Fees are added to the pool, accrue in real time
        and can be claimed by withdrawing your liquidity
      </div>
    </div>
  );
};

export default AddLiquidityPanel;
