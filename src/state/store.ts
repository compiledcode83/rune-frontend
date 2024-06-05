import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./application/slices/swapSlice";
import poolReducer from "./application/slices/poolSlice";

const store = configureStore({
  reducer: {
    swap: swapReducer,
    pool: poolReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
