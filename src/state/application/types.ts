import { SwapState } from "./slices/swapSlice";
import { PoolState } from "./slices/poolSlice";

export type RootState = {
  swap: SwapState;
  pool: PoolState;
};
