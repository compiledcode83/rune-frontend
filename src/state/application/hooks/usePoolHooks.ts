import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  setAddLiquidityTokenA,
  setAddLiquidityTokenB,
  setAddLiquidityTokenAAmount,
  setAddLiquidityTokenBAmount,
  setLiquidities,
  setAddLiquidityPoolUuid,
  setAddLiquidityLpTokenAmount,
  // setTokenBalances,
  // setMinaddLiquidityTokenAAmount,
  // setMaxaddLiquidityTokenAAmount,
  PoolState,
} from "../slices/poolSlice";
import { RootState } from "../types";
import { LiquidityType } from "@/types/type";

// UseaddLiquidityTokenA Hook
export const useAddLiquidityTokenA = () => {
  const dispatch = useAppDispatch();
  const addLiquidityTokenA = useAppSelector(
    (state: RootState) => state.pool.addLiquidityTokenA
  );

  const setAddLiquidityTokenACallback = useCallback(
    (item: PoolState["addLiquidityTokenA"]) => {
      dispatch(setAddLiquidityTokenA(item));
    },
    [dispatch]
  );

  return {
    addLiquidityTokenA,
    setAddLiquidityTokenA: setAddLiquidityTokenACallback,
  };
};

// UseaddLiquidityTokenB Hook
export const useAddLiquidityTokenB = () => {
  const dispatch = useAppDispatch();
  const addLiquidityTokenB = useAppSelector(
    (state: RootState) => state.pool.addLiquidityTokenB
  );

  const setAddLiquidityTokenBCallback = useCallback(
    (item: PoolState["addLiquidityTokenB"]) => {
      dispatch(setAddLiquidityTokenB(item));
    },
    [dispatch]
  );

  return {
    addLiquidityTokenB,
    setAddLiquidityTokenB: setAddLiquidityTokenBCallback,
  };
};

// UseaddLiquidityTokenAAmount Hook
export const useAddLiquidityTokenAAmount = () => {
  const dispatch = useAppDispatch();
  const addLiquidityTokenAAmount = useAppSelector(
    (state: RootState) => state.pool.addLiquidityTokenAAmount
  );

  const setAddLiquidityTokenAAmountCallback = useCallback(
    (item: number) => {
      dispatch(setAddLiquidityTokenAAmount(item));
    },
    [dispatch]
  );

  return {
    addLiquidityTokenAAmount,
    setAddLiquidityTokenAAmount: setAddLiquidityTokenAAmountCallback,
  };
};

// UseaddLiquidityTokenBAmount Hook
export const useAddLiquidityTokenBAmount = () => {
  const dispatch = useAppDispatch();
  const addLiquidityTokenBAmount = useAppSelector(
    (state: RootState) => state.pool.addLiquidityTokenBAmount
  );

  const setAddLiquidityTokenBAmountCallback = useCallback(
    (item: number) => {
      dispatch(setAddLiquidityTokenBAmount(item));
    },
    [dispatch]
  );

  return {
    addLiquidityTokenBAmount,
    setAddLiquidityTokenBAmount: setAddLiquidityTokenBAmountCallback,
  };
};

// UseLiquidities Hook
export const useLiquidites = () => {
  const dispatch = useAppDispatch();
  const liquidities = useAppSelector(
    (state: RootState) => state.pool.liquidities
  );

  const setLiquiditiesCallback = useCallback(
    (items: LiquidityType[]) => {
      dispatch(setLiquidities(items));
    },
    [dispatch]
  );

  return {
    liquidities,
    setLiquidities: setLiquiditiesCallback,
  };
};

// UseaddLiquidityPoolUuid Hook
export const useAddLiquidityPoolUuid = () => {
  const dispatch = useAppDispatch();
  const addLiquidityPoolUuid = useAppSelector(
    (state: RootState) => state.pool.addLiquidityPoolUuid
  );

  const setAddLiquidityPoolUuidCallback = useCallback(
    (item: string) => {
      dispatch(setAddLiquidityPoolUuid(item));
    },
    [dispatch]
  );

  return {
    addLiquidityPoolUuid,
    setAddLiquidityPoolUuid: setAddLiquidityPoolUuidCallback,
  };
};

// UseaddLiquidityLpTokenAmount Hook
export const useAddLiquidityLpTokenAmount = () => {
  const dispatch = useAppDispatch();
  const addLiquidityLpTokenAmount = useAppSelector(
    (state: RootState) => state.pool.addLiquidityLpTokenAmount
  );

  const setAddLiquidityLpTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setAddLiquidityLpTokenAmount(item));
    },
    [dispatch]
  );

  return {
    addLiquidityLpTokenAmount,
    setAddLiquidityLpTokenAmount: setAddLiquidityLpTokenAmountCallback,
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

// // UseMinaddLiquidityTokenAAmount Hook
// export const useMinaddLiquidityTokenAAmount = () => {
//   const dispatch = useAppDispatch();
//   const minaddLiquidityTokenAAmount = useAppSelector(
//     (state: RootState) => state.pool.minaddLiquidityTokenAAmount
//   );

//   const setMinaddLiquidityTokenAAmountCallback = useCallback(
//     (item: number) => {
//       dispatch(setMinaddLiquidityTokenAAmount(item));
//     },
//     [dispatch]
//   );

//   return {
//     minaddLiquidityTokenAAmount,
//     setMinaddLiquidityTokenAAmount: setMinaddLiquidityTokenAAmountCallback,
//   };
// };

// // UseMaxaddLiquidityTokenAAmount Hook
// export const useMaxaddLiquidityTokenAAmount = () => {
//   const dispatch = useAppDispatch();
//   const maxaddLiquidityTokenAAmount = useAppSelector(
//     (state: RootState) => state.pool.maxaddLiquidityTokenAAmount
//   );

//   const setMaxaddLiquidityTokenAAmountCallback = useCallback(
//     (item: number) => {
//       dispatch(setMaxaddLiquidityTokenAAmount(item));
//     },
//     [dispatch]
//   );

//   return {
//     maxaddLiquidityTokenAAmount,
//     setMaxaddLiquidityTokenAAmount: setMaxaddLiquidityTokenAAmountCallback,
//   };
// };
