import React, { useState, useEffect, useMemo, useRef } from "react";
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
import SettingPanel from "./SettingPanel";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useStatusContext } from "@/context/StatusContext";

import {
  useSendToken,
  useReceiveToken,
  useSendTokenAmount,
  useReceiveTokenAmount,
  usePoolTokens,
  useTokenBalances,
  useMinSendTokenAmount,
  useMaxSendTokenAmount,
} from "@/state/application/hooks/useSwapHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";
import {
  setMinSendTokenAmount,
  setTokenBalances,
} from "@/state/application/slices/swapSlice";
import { BalanceType, TokenType } from "@/types/type";

const SwapPanel = () => {
  const {
    setSwapSelectSendTokenModalOpen,
    setSwapSelectReceiveTokenModalOpen,
    setSwapConfirmModalOpen,
    setConnectWalletModalOpen,
  } = useStatusContext();

  const { ordinalAddress } = useUserContext();

  const handleConfirmSwapModalOpen = () => {
    setSwapConfirmModalOpen(true);
  };

  const [sendTokenBalance, setSendTokenBalance] = useState(0);
  const [receiveTokenBalance, setReceiveTokenBalance] = useState(0);

  const { sendToken, setSendToken } = useSendToken();
  const { poolTokens, setPoolTokens } = usePoolTokens();
  const { receiveToken, setReceiveToken } = useReceiveToken();
  const { sendTokenAmount, setSendTokenAmount } = useSendTokenAmount();
  const { receiveTokenAmount, setReceiveTokenAmount } = useReceiveTokenAmount();
  const { tokenBalances, setTokenBalances } = useTokenBalances();
  const { minSendTokenAmount, setMinSendTokenAmount } = useMinSendTokenAmount();
  const { maxSendTokenAmount, setMaxSendTokenAmount } = useMaxSendTokenAmount();

  const sendTokenAmountRef = useRef<any>(null);
  const sendTokenRef = useRef<any>(null);
  const receiveTokenRef = useRef<any>(null);

  const handleTokenAmount = (sendAmount: number) => {
    setSendTokenAmount(sendAmount);
  };

  const getReceiveAmount = async (sendAmount: number) => {
    const res = await poolApiService.getSwapAmount(
      sendTokenRef.current.uuid,
      sendAmount,
      receiveTokenRef.current.uuid
    );
    setReceiveTokenAmount(Number(res.receivingTokenAmount));
    setMinSendTokenAmount(Number(res.minTradingAmount));
    setMaxSendTokenAmount(Number(res.maxTradingAmount));
  };

  useEffect(() => {
    sendTokenAmountRef.current = sendTokenAmount;
    receiveTokenRef.current = receiveToken;
    sendTokenRef.current = sendToken;
  }, [sendToken, receiveToken, sendTokenAmount]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (receiveToken.uuid !== "" && sendToken.uuid !== "") {
        getReceiveAmount(sendTokenAmount);
      }
      if (receiveToken.uuid === "" && sendToken.uuid !== "") {
        setReceiveTokenAmount(0);
        setReceiveTokenBalance(0);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [sendTokenAmount, receiveToken]);

  useEffect(() => {
    (async () => {
      try {
        if (sendToken.uuid === "") {
          const resPoolTokens = await poolApiService.getPoolTokens();
          if (resPoolTokens.length < 2)
            throw new Error("there must be more than 1 token");
          setSendToken(resPoolTokens[0]);
          setPoolTokens(resPoolTokens);
        }
      } catch (error) {
        console.error((error as Error).message);
      }
    })();

    const getReceiveTokenAmountTimer = setInterval(() => {
      console.log(
        sendTokenAmountRef.current,
        sendTokenRef.current.uuid,
        receiveTokenRef.current.uuid
      );
      if (
        receiveTokenRef.current.uuid !== "" &&
        sendTokenRef.current.uuid !== ""
      ) {
        getReceiveAmount(sendTokenAmountRef.current);
      }
    }, 15000);
    return () => {
      clearInterval(getReceiveTokenAmountTimer);
    };
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
    const newBalance = tokenBalances.find(
      (tokenBalance) => tokenBalance.runeId === sendToken.runeId
    );
    if (newBalance) {
      setSendTokenBalance(newBalance.amount);
    } else {
      setSendTokenBalance(0);
    }
  }, [sendToken, ordinalAddress, poolTokens, tokenBalances]);

  useEffect(() => {
    const newBalance = tokenBalances.find(
      (tokenBalance) => tokenBalance.runeId === receiveToken.runeId
    );
    if (newBalance) {
      setReceiveTokenBalance(newBalance.amount);
    } else {
      setReceiveTokenBalance(0);
    }
  }, [receiveToken, ordinalAddress, poolTokens, tokenBalances]);

  const reverse = () => {
    const tempSendToken = sendToken;
    setSendToken(receiveToken);
    setSendTokenAmount(receiveTokenAmount);
    setReceiveToken(tempSendToken);
  };
  const onMax = () => {
    setSendTokenAmount(sendTokenBalance);
  };

  const SwapButton = () => {
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
    } else if (sendToken.runeId === "" || receiveToken.runeId === "") {
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
    } else if (sendTokenAmount === 0) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Input an amount
        </Button>
      );
    } else if (sendTokenAmount > sendTokenBalance) {
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
    } else if (
      sendTokenAmount < minSendTokenAmount ||
      sendTokenAmount > maxSendTokenAmount
    ) {
      return (
        <Button
          className=" w-full bg-white text-[16px] normal-case text-light-gray-font disabled:opacity-100 lg:text-[24px] dark:bg-[#2B3342] dark:text-dark-gray-font"
          placeholder={undefined}
          disabled
          // onClick={() => handleConfirmSwapModalOpen()}
        >
          Swap
        </Button>
      );
    } else {
      return (
        <Button
          className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
          placeholder={undefined}
          onClick={() => handleConfirmSwapModalOpen()}
        >
          Swap
        </Button>
      );
    }
  };

  return (
    <div>
      <div className="relative mx-auto mt-14 w-[350px] overflow-hidden rounded-xl bg-light-panel p-4 lg:w-[526px] dark:bg-dark-panel">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="pl-8 text-[20px] font-bold lg:text-[28px]">
              Swap
            </div>
            <div>
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                placement="bottom-end"
              >
                <PopoverHandler>
                  <Image
                    src={Setting}
                    alt="setting"
                    className="cursor-pointer"
                  />
                </PopoverHandler>
                <PopoverContent
                  placeholder={undefined}
                  className="z-[100] rounded-none border-none bg-transparent p-0"
                >
                  <SettingPanel />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="relative mt-2">
            <div className="rounded-xl bg-light-item p-4 px-6 dark:bg-dark-item">
              <div className="flex items-center justify-between">
                {sendToken.uuid === "" ? (
                  <Button
                    placeholder={undefined}
                    className="bg-gradient font-bold"
                    onClick={() => setSwapSelectSendTokenModalOpen(true)}
                  >
                    Select Token
                  </Button>
                ) : (
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-panel px-4 py-2 lg:gap-4 dark:bg-dark-panel"
                    onClick={() => setSwapSelectSendTokenModalOpen(true)}
                  >
                    <Image
                      src={sendToken.imgUrl}
                      alt={sendToken.spaced}
                      width={24}
                      height={24}
                    />
                    <div className="text-[12px] lg:text-[14px]">
                      {sendToken.spaced}
                    </div>
                    <Image src={ArrowDown} alt="arrow" />
                  </div>
                )}
                <div>
                  <input
                    className="w-[150px] bg-transparent text-right outline-none focus:overflow-hidden"
                    value={sendTokenAmount}
                    onChange={(e) => handleTokenAmount(Number(e.target.value))}
                    type="number"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
                <div className="flex gap-2">
                  <div>
                    Balance: {`${sendTokenBalance} ${sendToken.symbol}`}
                  </div>
                  {sendTokenBalance > 0 ? (
                    <div
                      className="cursor-pointer text-primary"
                      onClick={onMax}
                    >
                      MAX
                    </div>
                  ) : null}
                </div>
                {/* <div>≈$ 6726.2307</div> */}
              </div>
            </div>
            <div className="mt-2 rounded-xl bg-light-item p-4 px-6 dark:bg-dark-item">
              <div className="flex items-center justify-between">
                {receiveToken.uuid === "" ? (
                  <Button
                    placeholder={undefined}
                    className="bg-gradient font-bold"
                    onClick={() => setSwapSelectReceiveTokenModalOpen(true)}
                  >
                    Select Token
                  </Button>
                ) : (
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-panel px-4 py-2 lg:gap-4 dark:bg-dark-panel"
                    onClick={() => setSwapSelectReceiveTokenModalOpen(true)}
                  >
                    <Image
                      src={receiveToken.imgUrl}
                      alt={receiveToken.spaced}
                      width={24}
                      height={24}
                    />
                    <div className="text-[12px] lg:text-[14px]">
                      {receiveToken.spaced}
                    </div>
                    <Image src={ArrowDown} alt="eth" />
                  </div>
                )}
                <div>{receiveTokenAmount}</div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
                <div>
                  Balance: {`${receiveTokenBalance} ${receiveToken.symbol} `}
                </div>
                {/* <div>≈$ 284.6382</div> */}
              </div>
            </div>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[5px] border-light-panel bg-light-item p-2 dark:border-dark-panel dark:bg-dark-item"
              onClick={reverse}
            >
              <Image src={Arrow2} alt="exchangearrow" />
            </div>
          </div>
          {sendTokenAmount !== 0 &&
          receiveToken.runeId != "" &&
          (minSendTokenAmount > sendTokenAmount ||
            maxSendTokenAmount < sendTokenAmount) ? (
            <div className="mt-2 rounded-xl border border-red-300 bg-light-item p-1 px-6 text-justify text-[14px] lg:mt-5 dark:bg-dark-item dark:text-dark-gray-font">
              <div className="flex w-full flex-col">
                <div className="flex justify-between">
                  <div>Min sending amount for sale</div>
                  <div>{minSendTokenAmount}</div>
                </div>
                <div className="flex justify-between">
                  <div>Max sending amount for sale</div>
                  <div>{maxSendTokenAmount}</div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="mt-8">{SwapButton()}</div>
        </div>
        <div
          className="-z-5 absolute -right-8 top-14 h-72 w-72 rounded-full "
          style={{
            filter: "blur(50.5px)",
            background:
              "linear-gradient(125deg, rgba(61, 80, 253, 0.60) 4.38%, rgba(230, 51, 234, 0.55) 139.76%)",
          }}
        />
      </div>
      {/* <div className="mx-auto my-8 flex w-[350px] flex-col gap-2 text-[12px] lg:w-[500px] lg:gap-4 lg:text-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Minimum received
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>9.741 EOS</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Price Impact
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.01%</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Liquidity Provider Fee
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.0000066 ETH</div>
        </div>
        <div className="cursor-pointer text-center text-primary dark:text-[#EAAC33]">
          View Pair Analytics
        </div>
      </div> */}
    </div>
  );
};

export default SwapPanel;
