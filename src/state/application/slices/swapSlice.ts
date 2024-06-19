import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType, BalanceType } from "@/types/type";

export type SwapState = {
  sendToken: TokenType;
  isSendTokenAmountLoading: boolean;
  receiveToken: TokenType;
  isReceiveTokenAmountLoading: boolean;
  poolTokens: TokenType[];
  swapableTokens: TokenType[];
  tokenBalances: BalanceType[];
  sendTokenAmount: number;
  receiveTokenAmount: number;
  minTokenAmount: number;
  maxTokenAmount: number;
  slippage: number;
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
  isReceiveTokenAmountLoading: false,
  isSendTokenAmountLoading: false,
  poolTokens: [],
  swapableTokens: [],
  tokenBalances: [],
  sendTokenAmount: 0,
  receiveTokenAmount: 0,
  minTokenAmount: 0,
  maxTokenAmount: 0,
  slippage: 1,
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
    setIsSendTokenAmountLoading: (state, action: PayloadAction<boolean>) => {
      state.isSendTokenAmountLoading = action.payload;
    },
    setIsReceiveTokenAmountLoading: (state, action: PayloadAction<boolean>) => {
      state.isReceiveTokenAmountLoading = action.payload;
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
    setTokenBalances: (state, action: PayloadAction<BalanceType[]>) => {
      state.tokenBalances = action.payload;
    },
    setMinTokenAmount: (state, action: PayloadAction<number>) => {
      state.minTokenAmount = action.payload;
    },
    setMaxTokenAmount: (state, action: PayloadAction<number>) => {
      state.maxTokenAmount = action.payload;
    },
    setSlippage: (state, action: PayloadAction<number>) => {
      state.slippage = action.payload;
    },
  },
});

export const {
  setSendToken,
  setReceiveToken,
  setIsSendTokenAmountLoading,
  setIsReceiveTokenAmountLoading,
  setPoolTokens,
  setSwapableTokens,
  setSendTokenAmount,
  setReceiveTokenAmount,
  setTokenBalances,
  setMinTokenAmount,
  setMaxTokenAmount,
  setSlippage,
} = swapSlice.actions;

export default swapSlice.reducer;
