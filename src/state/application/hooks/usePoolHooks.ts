import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  setAddLiquidityToken1,
  setAddLiquidityToken2,
  // setPoolTokens,
  // setPoolableTokens,
  setAddLiquidityToken1Amount,
  setAddLiquidityToken2Amount,
  // setTokenBalances,
  // setMinaddLiquidityToken1Amount,
  // setMaxaddLiquidityToken1Amount,
  PoolState,
} from "../slices/poolSlice";
import { RootState } from "../types";

// UseaddLiquidityToken1 Hook
export const useAddLiquidityToken1 = () => {
  const dispatch = useAppDispatch();
  const addLiquidityToken1 = useAppSelector(
    (state: RootState) => state.pool.addLiquidityToken1
  );

  const setAddLiquidityToken1Callback = useCallback(
    (item: PoolState["addLiquidityToken1"]) => {
      dispatch(setAddLiquidityToken1(item));
    },
    [dispatch]
  );

  return {
    addLiquidityToken1,
    setAddLiquidityToken1: setAddLiquidityToken1Callback,
  };
};

// UseaddLiquidityToken2 Hook
export const useAddLiquidityToken2 = () => {
  const dispatch = useAppDispatch();
  const addLiquidityToken2 = useAppSelector(
    (state: RootState) => state.pool.addLiquidityToken2
  );

  const setAddLiquidityToken2Callback = useCallback(
    (item: PoolState["addLiquidityToken2"]) => {
      dispatch(setAddLiquidityToken2(item));
    },
    [dispatch]
  );

  return {
    addLiquidityToken2,
    setAddLiquidityToken2: setAddLiquidityToken2Callback,
  };
};

// // UsePoolTokens Hook
// export const usePoolTokens = () => {
//   const dispatch = useAppDispatch();
//   const poolTokens = useAppSelector(
//     (state: RootState) => state.pool.poolTokens
//   );

//   const setPoolTokensCallback = useCallback(
//     (items: PoolState["poolTokens"]) => {
//       dispatch(setPoolTokens(items));
//     },
//     [dispatch]
//   );

//   return { poolTokens, setPoolTokens: setPoolTokensCallback };
// };

// // UsePoolableTokens Hook
// export const usePoolableTokens = () => {
//   const dispatch = useAppDispatch();
//   const poolableTokens = useAppSelector(
//     (state: RootState) => state.pool.poolableTokens
//   );

//   const setPoolableTokensCallback = useCallback(
//     (items: PoolState["poolableTokens"]) => {
//       dispatch(setPoolableTokens(items));
//     },
//     [dispatch]
//   );

//   return { poolableTokens, setPoolableTokens: setPoolableTokensCallback };
// };

// UseaddLiquidityToken1Amount Hook
export const useAddLiquidityToken1Amount = () => {
  const dispatch = useAppDispatch();
  const addLiquidityToken1Amount = useAppSelector(
    (state: RootState) => state.pool.addLiquidityToken1Amount
  );

  const setAddLiquidityToken1AmountCallback = useCallback(
    (item: number) => {
      dispatch(setAddLiquidityToken1Amount(item));
    },
    [dispatch]
  );

  return {
    addLiquidityToken1Amount,
    setAddLiquidityToken1Amount: setAddLiquidityToken1AmountCallback,
  };
};

// UseaddLiquidityToken2Amount Hook
export const useAddLiquidityToken2Amount = () => {
  const dispatch = useAppDispatch();
  const addLiquidityToken2Amount = useAppSelector(
    (state: RootState) => state.pool.addLiquidityToken2Amount
  );

  const setAddLiquidityToken2AmountCallback = useCallback(
    (item: number) => {
      dispatch(setAddLiquidityToken2Amount(item));
    },
    [dispatch]
  );

  return {
    addLiquidityToken2Amount,
    setAddLiquidityToken2Amount: setAddLiquidityToken2AmountCallback,
  };
};

// // UseTokenBalances Hook
// export const useTokenBalances = () => {
//   const dispatch = useAppDispatch();
//   const tokenBalances = useAppSelector(
//     (state: RootState) => state.pool.tokenBalances
//   );

//   const setTokenBalancesCallback = useCallback(
//     (items: PoolState["tokenBalances"]) => {
//       dispatch(setTokenBalances(items));
//     },
//     [dispatch]
//   );

//   return {
//     tokenBalances,
//     setTokenBalances: setTokenBalancesCallback,
//   };
// };

// // UseMinaddLiquidityToken1Amount Hook
// export const useMinaddLiquidityToken1Amount = () => {
//   const dispatch = useAppDispatch();
//   const minaddLiquidityToken1Amount = useAppSelector(
//     (state: RootState) => state.pool.minaddLiquidityToken1Amount
//   );

//   const setMinaddLiquidityToken1AmountCallback = useCallback(
//     (item: number) => {
//       dispatch(setMinaddLiquidityToken1Amount(item));
//     },
//     [dispatch]
//   );

//   return {
//     minaddLiquidityToken1Amount,
//     setMinaddLiquidityToken1Amount: setMinaddLiquidityToken1AmountCallback,
//   };
// };

// // UseMaxaddLiquidityToken1Amount Hook
// export const useMaxaddLiquidityToken1Amount = () => {
//   const dispatch = useAppDispatch();
//   const maxaddLiquidityToken1Amount = useAppSelector(
//     (state: RootState) => state.pool.maxaddLiquidityToken1Amount
//   );

//   const setMaxaddLiquidityToken1AmountCallback = useCallback(
//     (item: number) => {
//       dispatch(setMaxaddLiquidityToken1Amount(item));
//     },
//     [dispatch]
//   );

//   return {
//     maxaddLiquidityToken1Amount,
//     setMaxaddLiquidityToken1Amount: setMaxaddLiquidityToken1AmountCallback,
//   };
// };
