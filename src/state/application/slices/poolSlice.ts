import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType, LiquidityType } from "@/types/type";

export type PoolState = {
  addLiquidityTokenA: TokenType;
  addLiquidityTokenB: TokenType;
  // poolTokens: TokenType[];
  // poolableTokens: TokenType[];
  // tokenBalances: BalanceType[];
  addLiquidityTokenAAmount: number;
  addLiquidityTokenBAmount: number;
  liquidities: LiquidityType[];
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
  addLiquidityTokenAAmount: 0,
  addLiquidityTokenBAmount: 0,
  liquidities: [],
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
  // setTokenBalances,
  // setMinaddLiquidityTokenAAmount,
  // setMaxaddLiquidityTokenAAmount,
} = poolSlice.actions;

export default poolSlice.reducer;
