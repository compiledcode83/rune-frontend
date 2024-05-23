import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import ArrowDown from "@/assets/imgs/arrowdown.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { BalanceType, TokenType } from "@/types/type";

import {
  usePoolTokens,
  useTokenBalances,
} from "@/state/application/hooks/useSwapHooks";
import {
  useAddLiquidityCurrentPool,
  useAddLiquidityLpTokenAmount,
  useAddLiquidityPoolUuid,
  useAddLiquidityTokenA,
  useAddLiquidityTokenAAmount,
  useAddLiquidityTokenB,
  useAddLiquidityTokenBAmount,
  useLiquidites,
} from "@/state/application/hooks/usePoolHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import {
  convertToSats,
  convertWithDecimal,
  stringToDisplay,
} from "@/utils/utils";

const AddLiquidityPanel = () => {
  const {
    setAddLiquidityModalOpen,
    setAddLiquidityConfirmModalOpen,
    setAddLiquiditySelectTokenAModalOpen,
    setAddLiquiditySelectTokenBModalOpen,
    setConnectWalletModalOpen,
  } = useStatusContext();

  const { ordinalAddress } = useUserContext();

  const { poolTokens, setPoolTokens } = usePoolTokens();
  const { addLiquidityTokenA, setAddLiquidityTokenA } = useAddLiquidityTokenA();
  const { addLiquidityTokenB, setAddLiquidityTokenB } = useAddLiquidityTokenB();

  const { addLiquidityTokenAAmount, setAddLiquidityTokenAAmount } =
    useAddLiquidityTokenAAmount();
  const { addLiquidityTokenBAmount, setAddLiquidityTokenBAmount } =
    useAddLiquidityTokenBAmount();
  const { addLiquidityPoolUuid, setAddLiquidityPoolUuid } =
    useAddLiquidityPoolUuid();
  const { setAddLiquidityLpTokenAmount } = useAddLiquidityLpTokenAmount();
  const { tokenBalances, setTokenBalances } = useTokenBalances();
  const { liquidities } = useLiquidites();
  const { addLiquidityCurrentPool, setAddLiquidityCurrentPool } =
    useAddLiquidityCurrentPool();

  const [addLiquidityTokenABalance, setAddLiquidityTokenABalance] = useState(0);
  const [addLiquidityTokenBBalance, setAddLiquidityTokenBBalance] = useState(0);

  useEffect(() => {
    (async () => {
      if (addLiquidityTokenA.uuid === "") {
        try {
          const resPoolTokens = await poolApiService.getPoolTokens();
          if (resPoolTokens.length < 2)
            throw new Error("there must be more than 1 token");
          setAddLiquidityTokenA(resPoolTokens[0]);
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
    if (addLiquidityTokenA.runeId === "") {
      setAddLiquidityTokenAAmount(0);
      setAddLiquidityTokenABalance(0);
    } else {
      const newBalance = tokenBalances.find(
        (tokenBalance) => tokenBalance.runeId === addLiquidityTokenA.runeId
      );
      if (newBalance) {
        setAddLiquidityTokenABalance(newBalance.amount);
      } else {
        setAddLiquidityTokenABalance(0);
      }
    }
  }, [addLiquidityTokenA, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    if (addLiquidityTokenB.runeId === "") {
      setAddLiquidityTokenBAmount(0);
      setAddLiquidityTokenBBalance(0);
    } else {
      const newBalance = tokenBalances.find(
        (tokenBalance) => tokenBalance.runeId === addLiquidityTokenA.runeId
      );
      if (newBalance) {
        setAddLiquidityTokenBBalance(newBalance.amount);
      } else {
        setAddLiquidityTokenBBalance(0);
      }
    }
  }, [addLiquidityTokenA, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    const newBalance = tokenBalances.find(
      (tokenBalance) => tokenBalance.runeId === addLiquidityTokenB.runeId
    );
    if (newBalance) {
      setAddLiquidityTokenBBalance(newBalance.amount);
    } else {
      setAddLiquidityTokenBBalance(0);
    }
  }, [addLiquidityTokenB, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    if (addLiquidityTokenA.uuid !== "" && addLiquidityTokenB.uuid !== "") {
      (async () => {
        const resPoolInfo = await poolApiService.getPoolInfo(
          addLiquidityTokenA.uuid,
          addLiquidityTokenB.uuid
        );
        setAddLiquidityPoolUuid(resPoolInfo.uuid);
        setAddLiquidityCurrentPool(resPoolInfo);
      })();
    } else {
      setAddLiquidityPoolUuid("");
    }
  }, [addLiquidityTokenA, addLiquidityTokenB]);

  useEffect(() => {
    if (addLiquidityTokenAAmount === 0 || addLiquidityTokenB.uuid === "") {
      setAddLiquidityTokenBAmount(0);
    } else if (addLiquidityPoolUuid !== "") {
      (async () => {
        let tokenType;
        if (
          addLiquidityCurrentPool.tokenA.runeId === addLiquidityTokenA.runeId
        ) {
          tokenType = "A";
        } else {
          tokenType = "B";
        }
        const resTokensAmount = await poolApiService.getAddLiquidityTokenAmount(
          addLiquidityPoolUuid,
          addLiquidityTokenAAmount,
          tokenType
        );
        const { tokenBAmount, tokenAAmount, lpTokenAmount } = resTokensAmount;
        if (tokenType === "A") {
          setAddLiquidityTokenBAmount(tokenBAmount);
        } else {
          setAddLiquidityTokenBAmount(tokenAAmount);
        }
        setAddLiquidityLpTokenAmount(lpTokenAmount);
      })();
    }
  }, [
    addLiquidityTokenAAmount,
    addLiquidityTokenA.uuid,
    addLiquidityTokenB.uuid,
    addLiquidityPoolUuid,
  ]);

  const handleAddLiquidityConfirmModalOpen = () => {
    setAddLiquidityConfirmModalOpen(true);
  };

  const reverse = () => {
    const tempTokenA = addLiquidityTokenA;
    setAddLiquidityTokenA(addLiquidityTokenB);
    setAddLiquidityTokenAAmount(addLiquidityTokenBAmount);
    setAddLiquidityTokenB(tempTokenA);
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
      addLiquidityTokenA.runeId === "" ||
      addLiquidityTokenB.runeId === ""
    ) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Invalid Pair
        </Button>
      );
    } else if (
      addLiquidityTokenAAmount === 0 ||
      addLiquidityTokenBAmount === 0
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
      addLiquidityTokenAAmount > addLiquidityTokenABalance ||
      addLiquidityTokenBAmount > addLiquidityTokenBBalance
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
                    value={convertWithDecimal(
                      addLiquidityTokenAAmount,
                      addLiquidityTokenA
                    )}
                    onChange={(e) =>
                      setAddLiquidityTokenAAmount(
                        convertToSats(
                          Number(e.target.value),
                          addLiquidityTokenA
                        )
                      )
                    }
                    disabled={addLiquidityTokenA.runeId === ""}
                    type="number"
                  />
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance:
                  {addLiquidityTokenA.runeId === "" || ordinalAddress === ""
                    ? " -"
                    : stringToDisplay(
                        convertWithDecimal(
                          addLiquidityTokenABalance,
                          addLiquidityTokenA
                        )
                      )}
                </div>
              </div>
              {addLiquidityTokenA.runeId === "" ? (
                <Button
                  placeholder={undefined}
                  className="bg-gradient font-bold"
                  onClick={() => setAddLiquiditySelectTokenAModalOpen(true)}
                >
                  Select Token
                </Button>
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                  onClick={() => setAddLiquiditySelectTokenAModalOpen(true)}
                >
                  <Image
                    src={addLiquidityTokenA.imgUrl}
                    alt={addLiquidityTokenA.name}
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] lg:text-[14px]">
                    {addLiquidityTokenA.spaced}
                  </div>
                  <Image src={ArrowDown} alt="arrow" />
                </div>
              )}
            </div>
          </div>
          <div className="my-8 h-[1px] bg-[#535358]">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[2px] border-light-panel bg-light-item p-2 dark:border-dark-panel dark:bg-dark-item"
              onClick={reverse}
            >
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
                    value={stringToDisplay(
                      convertWithDecimal(
                        addLiquidityTokenBAmount,
                        addLiquidityTokenB
                      )
                    )}
                    disabled
                  />
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance:
                  {addLiquidityTokenB.runeId === "" || ordinalAddress === ""
                    ? " -"
                    : stringToDisplay(
                        convertWithDecimal(
                          addLiquidityTokenBBalance,
                          addLiquidityTokenB
                        )
                      )}
                </div>
              </div>
              {addLiquidityTokenB.runeId === "" ? (
                <Button
                  placeholder={undefined}
                  className="bg-gradient font-bold"
                  onClick={() => {
                    setAddLiquiditySelectTokenBModalOpen(true);
                  }}
                >
                  Select Token
                </Button>
              ) : (
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                  onClick={() => setAddLiquiditySelectTokenBModalOpen(true)}
                >
                  <Image
                    src={addLiquidityTokenB.imgUrl}
                    alt={addLiquidityTokenB.name}
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] lg:text-[14px]">
                    {addLiquidityTokenB.spaced}
                  </div>
                  <Image src={ArrowDown} alt="arrow" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="mt-2 flex flex-col gap-2 text-[12px] lg:mt-4 lg:text-[14px]">
          <div className="flex items-center justify-between">
            <div>Price</div>
            <div>0.00027 ETH per 1 EOS</div>
          </div>
        </div> */}
        <div className="mt-8">{AddLiquidityButton()}</div>
      </div>
      <div className="mt-8 text-center text-[12px] text-white lg:text-[16px]">
        By adding liquidity earn 0.0001 BTC of all trades on this pair
        proportional to your share of the pool. Fees are added to the pool,
        accrue in real time and can be claimed by withdrawing your liquidity
      </div>
    </div>
  );
};

export default AddLiquidityPanel;
