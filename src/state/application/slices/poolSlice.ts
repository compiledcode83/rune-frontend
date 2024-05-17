import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType, LiquidityType, PoolType } from "@/types/type";

export type PoolState = {
  addLiquidityTokenA: TokenType;
  addLiquidityTokenB: TokenType;
  addLiquidityPoolUuid: string;
  addLiquidityTokenAAmount: number;
  addLiquidityTokenBAmount: number;
  addLiquidityLpTokenAmount: number;
  addLiquidityCurrentPool: PoolType;
  liquidities: LiquidityType[];
  removeLiquidityTokenA: TokenType;
  removeLiquidityTokenB: TokenType;
  removeLiquidityPoolUuid: string;
  removeLiquidityTokenAAmount: number;
  removeLiquidityTokenBAmount: number;
  removeLiquiditySharePercent: number;
  removeLiquidityLpTokenAmount: number;
  // collectFeeTokenA: TokenType;
  // collectFeeTokenB: TokenType;
  // collectFeeTokenAAmount: number;
  // collectFeeTokenBAmount: number;
  collectFeeAmount: number;
  collectFeePoolUuid: string;
};

const initialToken: TokenType = {
  uuid: "",
  name: "",
  imgUrl: "",
  runeId: "",
  spaced: "",
  symbol: "",
  divisibility: 0,
};

const initialPool: PoolType = {
  tokenA: initialToken,
  tokenB: initialToken,
  uuid: "",
};

const initialState: PoolState = {
  addLiquidityTokenA: initialToken,
  addLiquidityTokenB: initialToken,
  addLiquidityPoolUuid: "",
  addLiquidityTokenAAmount: 0,
  addLiquidityTokenBAmount: 0,
  addLiquidityLpTokenAmount: 0,
  removeLiquidityTokenA: initialToken,
  removeLiquidityTokenB: initialToken,
  removeLiquidityPoolUuid: "",
  removeLiquidityTokenAAmount: 0,
  removeLiquidityTokenBAmount: 0,
  removeLiquiditySharePercent: 0,
  removeLiquidityLpTokenAmount: 0,
  liquidities: [],
  addLiquidityCurrentPool: initialPool,
  // collectFeeTokenA: initialToken,
  // collectFeeTokenB: initialToken,
  // collectFeeTokenAAmount: 0,
  // collectFeeTokenBAmount: 0,
  collectFeePoolUuid: "",
  collectFeeAmount: 0,
};

export const poolSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {
    setAddLiquidityTokenA: (state, action: PayloadAction<TokenType>) => {
      state.addLiquidityTokenA = action.payload;
    },
    setAddLiquidityTokenB: (state, action: PayloadAction<TokenType>) => {
      state.addLiquidityTokenB = action.payload;
    },

    setAddLiquidityTokenAAmount: (state, action: PayloadAction<number>) => {
      state.addLiquidityTokenAAmount = action.payload;
    },
    setAddLiquidityTokenBAmount: (state, action: PayloadAction<number>) => {
      state.addLiquidityTokenBAmount = action.payload;
    },

    setAddLiquidityPoolUuid: (state, action: PayloadAction<string>) => {
      state.addLiquidityPoolUuid = action.payload;
    },
    setAddLiquidityLpTokenAmount: (state, action: PayloadAction<number>) => {
      state.addLiquidityLpTokenAmount = action.payload;
    },

    setAddLiquidityCurrentPool: (state, action: PayloadAction<PoolType>) => {
      state.addLiquidityCurrentPool = action.payload;
    },

    setLiquidities: (state, action: PayloadAction<LiquidityType[]>) => {
      state.liquidities = action.payload;
    },

    setRemoveLiquidityTokenA: (state, action: PayloadAction<TokenType>) => {
      state.removeLiquidityTokenA = action.payload;
    },
    setRemoveLiquidityTokenB: (state, action: PayloadAction<TokenType>) => {
      state.removeLiquidityTokenB = action.payload;
    },

    setRemoveLiquidityTokenAAmount: (state, action: PayloadAction<number>) => {
      state.removeLiquidityTokenAAmount = action.payload;
    },
    setRemoveLiquidityTokenBAmount: (state, action: PayloadAction<number>) => {
      state.removeLiquidityTokenBAmount = action.payload;
    },

    setRemoveLiquidityPoolUuid: (state, action: PayloadAction<string>) => {
      state.removeLiquidityPoolUuid = action.payload;
    },

    setRemoveLiquiditySharePercent: (state, action: PayloadAction<number>) => {
      state.removeLiquiditySharePercent = action.payload;
    },
    setRemoveLiquidityLpTokenAmount: (state, action: PayloadAction<number>) => {
      state.removeLiquidityLpTokenAmount = action.payload;
    },

    // setCollectFeeTokenA: (state, action: PayloadAction<TokenType>) => {
    //   state.collectFeeTokenA = action.payload;
    // },
    // setCollectFeeTokenB: (state, action: PayloadAction<TokenType>) => {
    //   state.collectFeeTokenB = action.payload;
    // },

    // setCollectFeeTokenAAmount: (state, action: PayloadAction<number>) => {
    //   state.collectFeeTokenAAmount = action.payload;
    // },
    // setCollectFeeTokenBAmount: (state, action: PayloadAction<number>) => {
    //   state.collectFeeTokenBAmount = action.payload;
    // },
    setCollectFeeAmount: (state, action: PayloadAction<number>) => {
      state.collectFeeAmount = action.payload;
    },

    setCollectFeePoolUuid: (state, action: PayloadAction<string>) => {
      state.collectFeePoolUuid = action.payload;
    },
  },
});

export const {
  setAddLiquidityTokenA,
  setAddLiquidityTokenB,
  setAddLiquidityTokenAAmount,
  setAddLiquidityTokenBAmount,
  setAddLiquidityPoolUuid,
  setAddLiquidityLpTokenAmount,
  setAddLiquidityCurrentPool,
  setLiquidities,
  setRemoveLiquidityTokenA,
  setRemoveLiquidityTokenB,
  setRemoveLiquidityTokenAAmount,
  setRemoveLiquidityTokenBAmount,
  setRemoveLiquidityPoolUuid,
  setRemoveLiquiditySharePercent,
  setRemoveLiquidityLpTokenAmount,
  // setCollectFeeTokenA,
  // setCollectFeeTokenB,
  // setCollectFeeTokenAAmount,
  // setCollectFeeTokenBAmount,
  setCollectFeeAmount,
  setCollectFeePoolUuid,
} = poolSlice.actions;

export default poolSlice.reducer;
