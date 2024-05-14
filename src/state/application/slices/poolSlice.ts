import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType, BalanceType } from "@/types/type";

export type PoolState = {
  addLiquidityToken1: TokenType;
  addLiquidityToken2: TokenType;
  // poolTokens: TokenType[];
  // poolableTokens: TokenType[];
  // tokenBalances: BalanceType[];
  addLiquidityToken1Amount: number;
  addLiquidityToken2Amount: number;
  // minaddLiquidityToken1Amount: number;
  // maxaddLiquidityToken1Amount: number;
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
  addLiquidityToken1: initialToken,
  addLiquidityToken2: initialToken,
  // poolTokens: [],
  // poolableTokens: [],
  // tokenBalances: [],
  addLiquidityToken1Amount: 0,
  addLiquidityToken2Amount: 0,
  // minaddLiquidityToken1Amount: 0,
  // maxaddLiquidityToken1Amount: 0,
};

export const poolSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {
    setAddLiquidityToken1: (state, action: PayloadAction<TokenType>) => {
      state.addLiquidityToken1 = action.payload;
    },
    setAddLiquidityToken2: (state, action: PayloadAction<TokenType>) => {
      state.addLiquidityToken2 = action.payload;
    },
    // setPoolTokens: (state, action: PayloadAction<TokenType[]>) => {
    //   state.poolTokens = action.payload;
    // },
    // setPoolableTokens: (state, action: PayloadAction<TokenType[]>) => {
    //   state.poolableTokens = action.payload;
    // },
    setAddLiquidityToken1Amount: (state, action: PayloadAction<number>) => {
      state.addLiquidityToken1Amount = action.payload;
    },
    setAddLiquidityToken2Amount: (state, action: PayloadAction<number>) => {
      state.addLiquidityToken2Amount = action.payload;
    },
    // setTokenBalances: (state, action: PayloadAction<BalanceType[]>) => {
    //   state.tokenBalances = action.payload;
    // },
    // setMinaddLiquidityToken1Amount: (state, action: PayloadAction<number>) => {
    //   state.minaddLiquidityToken1Amount = action.payload;
    // },
    // setMaxaddLiquidityToken1Amount: (state, action: PayloadAction<number>) => {
    //   state.maxaddLiquidityToken1Amount = action.payload;
    // },
  },
});

export const {
  setAddLiquidityToken1,
  setAddLiquidityToken2,
  // setPoolTokens,
  // setPoolableTokens,
  setAddLiquidityToken1Amount,
  setAddLiquidityToken2Amount,
  // setTokenBalances,
  // setMinaddLiquidityToken1Amount,
  // setMaxaddLiquidityToken1Amount,
} = poolSlice.actions;

export default poolSlice.reducer;
