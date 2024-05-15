import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  setAddLiquidityTokenA,
  setAddLiquidityTokenB,
  setAddLiquidityTokenAAmount,
  setAddLiquidityTokenBAmount,
  setAddLiquidityPoolUuid,
  setAddLiquidityLpTokenAmount,
  setRemoveLiquidityTokenA,
  setRemoveLiquidityTokenB,
  setRemoveLiquidityTokenAAmount,
  setRemoveLiquidityTokenBAmount,
  setRemoveLiquidityPoolUuid,
  setRemoveLiquiditySharePercent,
  setRemoveLiquidityLpTokenAmount,
  setLiquidities,
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

export const useRemoveLiquidityTokenA = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityTokenA = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityTokenA
  );

  const setRemoveLiquidityTokenACallback = useCallback(
    (item: PoolState["removeLiquidityTokenA"]) => {
      dispatch(setRemoveLiquidityTokenA(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityTokenA,
    setRemoveLiquidityTokenA: setRemoveLiquidityTokenACallback,
  };
};

// UseremoveLiquidityTokenB Hook
export const useRemoveLiquidityTokenB = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityTokenB = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityTokenB
  );

  const setRemoveLiquidityTokenBCallback = useCallback(
    (item: PoolState["removeLiquidityTokenB"]) => {
      dispatch(setRemoveLiquidityTokenB(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityTokenB,
    setRemoveLiquidityTokenB: setRemoveLiquidityTokenBCallback,
  };
};

// UseremoveLiquidityTokenAAmount Hook
export const useRemoveLiquidityTokenAAmount = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityTokenAAmount = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityTokenAAmount
  );

  const setRemoveLiquidityTokenAAmountCallback = useCallback(
    (item: number) => {
      dispatch(setRemoveLiquidityTokenAAmount(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityTokenAAmount,
    setRemoveLiquidityTokenAAmount: setRemoveLiquidityTokenAAmountCallback,
  };
};

// UseremoveLiquidityTokenBAmount Hook
export const useRemoveLiquidityTokenBAmount = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityTokenBAmount = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityTokenBAmount
  );

  const setRemoveLiquidityTokenBAmountCallback = useCallback(
    (item: number) => {
      dispatch(setRemoveLiquidityTokenBAmount(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityTokenBAmount,
    setRemoveLiquidityTokenBAmount: setRemoveLiquidityTokenBAmountCallback,
  };
};

// UseremoveLiquidityPoolUuid Hook
export const useRemoveLiquidityPoolUuid = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityPoolUuid = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityPoolUuid
  );

  const setRemoveLiquidityPoolUuidCallback = useCallback(
    (item: string) => {
      dispatch(setRemoveLiquidityPoolUuid(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityPoolUuid,
    setRemoveLiquidityPoolUuid: setRemoveLiquidityPoolUuidCallback,
  };
};

// useRemoveLiquiditySharePercent Hook
export const useRemoveLiquiditySharePercent = () => {
  const dispatch = useAppDispatch();
  const removeLiquiditySharePercent = useAppSelector(
    (state: RootState) => state.pool.removeLiquiditySharePercent
  );

  const setRemoveLiquiditySharePercentCallback = useCallback(
    (item: number) => {
      dispatch(setRemoveLiquiditySharePercent(item));
    },
    [dispatch]
  );

  return {
    removeLiquiditySharePercent,
    setRemoveLiquiditySharePercent: setRemoveLiquiditySharePercentCallback,
  };
};

// useRemoveLiquiditySharePercent Hook
export const useRemoveLiquidityLpTokenAmount = () => {
  const dispatch = useAppDispatch();
  const removeLiquidityLpTokenAmount = useAppSelector(
    (state: RootState) => state.pool.removeLiquidityLpTokenAmount
  );

  const setRemoveLiquidityLpTokenAmountCallback = useCallback(
    (item: number) => {
      dispatch(setRemoveLiquidityLpTokenAmount(item));
    },
    [dispatch]
  );

  return {
    removeLiquidityLpTokenAmount,
    setRemoveLiquidityLpTokenAmount: setRemoveLiquidityLpTokenAmountCallback,
  };
};
