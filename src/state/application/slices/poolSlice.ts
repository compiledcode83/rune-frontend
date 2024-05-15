import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType, LiquidityType, PoolInfoType } from "@/types/type";

export type PoolState = {
  addLiquidityTokenA: TokenType;
  addLiquidityTokenB: TokenType;
  addLiquidityPoolUuid: string;
  addLiquidityTokenAAmount: number;
  addLiquidityTokenBAmount: number;
  addLiquidityLpTokenAmount: number;
  liquidities: LiquidityType[];
  removeLiquidityUuid: string;
  // minaddLiquidityTokenAAmount: number;
  // maxaddLiquidityTokenAAmount: number;
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

const initialState: PoolState = {
  addLiquidityTokenA: initialToken,
  addLiquidityTokenB: initialToken,
  addLiquidityPoolUuid: "",
  addLiquidityTokenAAmount: 0,
  addLiquidityTokenBAmount: 0,
  addLiquidityLpTokenAmount: 0,
  removeLiquidityUuid: "",
  liquidities: [],
  // poolInfo: [],
  // minaddLiquidityTokenAAmount: 0,
  // maxaddLiquidityTokenAAmount: 0,
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
    setLiquidities: (state, action: PayloadAction<LiquidityType[]>) => {
      state.liquidities = action.payload;
    },
    setAddLiquidityPoolUuid: (state, action: PayloadAction<string>) => {
      state.addLiquidityPoolUuid = action.payload;
    },
    setAddLiquidityLpTokenAmount: (state, action: PayloadAction<number>) => {
      state.addLiquidityLpTokenAmount = action.payload;
    },
    // setTokenBalances: (state, action: PayloadAction<BalanceType[]>) => {
    //   state.tokenBalances = action.payload;
    // },
    // setMinaddLiquidityTokenAAmount: (state, action: PayloadAction<number>) => {
    //   state.minaddLiquidityTokenAAmount = action.payload;
    // },
    // setMaxaddLiquidityTokenAAmount: (state, action: PayloadAction<number>) => {
    //   state.maxaddLiquidityTokenAAmount = action.payload;
    // },
  },
});

export const {
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
} = poolSlice.actions;

export default poolSlice.reducer;
