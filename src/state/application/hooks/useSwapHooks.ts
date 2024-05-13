import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  setSendToken,
  setReceiveToken,
  setPoolTokens,
  setSwapableTokens,
  setSendTokenAmount,
  setReceiveTokenAmount,
  setTokenBalances,
  setMinSendTokenAmount,
  setMaxSendTokenAmount,
  SwapState,
} from "../slices/swapSlice";
import { RootState } from "../types";

// UseSendToken Hook
export const useSendToken = () => {
  const dispatch = useAppDispatch();
  const sendToken = useAppSelector((state: RootState) => state.swap.sendToken);

  const setSendTokenCallback = useCallback(
    (item: SwapState["sendToken"]) => {
      dispatch(setSendToken(item));
    },
    [dispatch]
  );

  return { sendToken, setSendToken: setSendTokenCallback };
};

// UseReceiveToken Hook
export const useReceiveToken = () => {
  const dispatch = useAppDispatch();
  const receiveToken = useAppSelector(
    (state: RootState) => state.swap.receiveToken
  );

  const setReceiveTokenCallback = useCallback(
    (item: SwapState["receiveToken"]) => {
      dispatch(setReceiveToken(item));
    },
    [dispatch]
  );

  return { receiveToken, setReceiveToken: setReceiveTokenCallback };
};

// UsePoolTokens Hook
export const usePoolTokens = () => {
  const dispatch = useAppDispatch();
  const poolTokens = useAppSelector(
    (state: RootState) => state.swap.poolTokens
  );

  const setPoolTokensCallback = useCallback(
    (items: SwapState["poolTokens"]) => {
      dispatch(setPoolTokens(items));
    },
    [dispatch]
  );

  return { poolTokens, setPoolTokens: setPoolTokensCallback };
};

// UseSwapableTokens Hook
export const useSwapableTokens = () => {
  const dispatch = useAppDispatch();
  const swapableTokens = useAppSelector(
    (state: RootState) => state.swap.swapableTokens
  );

  const setSwapableTokensCallback = useCallback(
    (items: SwapState["swapableTokens"]) => {
      dispatch(setSwapableTokens(items));
    },
    [dispatch]
  );

  return { swapableTokens, setSwapableTokens: setSwapableTokensCallback };
};

// UseSendTokenAmount Hook
export const useSendTokenAmount = () => {
  const dispatch = useAppDispatch();
  const sendTokenAmount = useAppSelector(
    (state: RootState) => state.swap.sendTokenAmount
  );

  const setSendTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setSendTokenAmount(item));
    },
    [dispatch]
  );

  return { sendTokenAmount, setSendTokenAmount: setSendTokenAmountCallback };
};

// UseReceiveTokenAmount Hook
export const useReceiveTokenAmount = () => {
  const dispatch = useAppDispatch();
  const receiveTokenAmount = useAppSelector(
    (state: RootState) => state.swap.receiveTokenAmount
  );

  const setReceiveTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setReceiveTokenAmount(item));
    },
    [dispatch]
  );

  return {
    receiveTokenAmount,
    setReceiveTokenAmount: setReceiveTokenAmountCallback,
  };
};

// UseTokenBalances Hook
export const useTokenBalances = () => {
  const dispatch = useAppDispatch();
  const tokenBalances = useAppSelector(
    (state: RootState) => state.swap.tokenBalances
  );

  const setTokenBalancesCallback = useCallback(
    (items: SwapState["tokenBalances"]) => {
      dispatch(setTokenBalances(items));
    },
    [dispatch]
  );

  return {
    tokenBalances,
    setTokenBalances: setTokenBalancesCallback,
  };
};

// UseMinSendTokenAmount Hook
export const useMinSendTokenAmount = () => {
  const dispatch = useAppDispatch();
  const minSendTokenAmount = useAppSelector(
    (state: RootState) => state.swap.minSendTokenAmount
  );

  const setMinSendTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setMinSendTokenAmount(item));
    },
    [dispatch]
  );

  return {
    minSendTokenAmount,
    setMinSendTokenAmount: setMinSendTokenAmountCallback,
  };
};

// UseMaxSendTokenAmount Hook
export const useMaxSendTokenAmount = () => {
  const dispatch = useAppDispatch();
  const maxSendTokenAmount = useAppSelector(
    (state: RootState) => state.swap.maxSendTokenAmount
  );

  const setMaxSendTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setMaxSendTokenAmount(item));
    },
    [dispatch]
  );

  return {
    maxSendTokenAmount,
    setMaxSendTokenAmount: setMaxSendTokenAmountCallback,
  };
};
