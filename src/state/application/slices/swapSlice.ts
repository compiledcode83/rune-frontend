import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType } from "@/types/type";

export type SwapState = {
  sendToken: TokenType;
  receiveToken: TokenType;
  poolTokens: TokenType[];
  swapableTokens: TokenType[];
  sendTokenAmount: number;
  receiveTokenAmount: number;
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

const initialState: SwapState = {
  sendToken: initialToken,
  receiveToken: initialToken,
  poolTokens: [],
  swapableTokens: [],
  sendTokenAmount: 0,
  receiveTokenAmount: 0,
};

export const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setSendToken: (state, action: PayloadAction<TokenType>) => {
      state.sendToken = action.payload;
    },
    setReceiveToken: (state, action: PayloadAction<TokenType>) => {
      state.receiveToken = action.payload;
    },
    setPoolTokens: (state, action: PayloadAction<TokenType[]>) => {
      state.poolTokens = action.payload;
    },
    setSwapableTokens: (state, action: PayloadAction<TokenType[]>) => {
      state.swapableTokens = action.payload;
    },
    setSendTokenAmount: (state, action: PayloadAction<number>) => {
      state.sendTokenAmount = action.payload;
    },
    setReceiveTokenAmount: (state, action: PayloadAction<number>) => {
      state.receiveTokenAmount = action.payload;
    },
  },
});

export const {
  setSendToken,
  setReceiveToken,
  setPoolTokens,
  setSwapableTokens,
  setSendTokenAmount,
  setReceiveTokenAmount,
} = swapSlice.actions;

export default swapSlice.reducer;
