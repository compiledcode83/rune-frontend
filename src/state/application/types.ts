import { DiscoverDealState } from "./slices/discoverDealSlice";
import { MyOfferState } from "./slices/myOfferSlice";
import { OfferState } from "./slices/offerSlice";
import { SwapState } from "./slices/swapSlice";
import { PoolState } from "./slices/poolSlice";

export type RootState = {
  offer: OfferState;
  myOffer: MyOfferState;
  discoverDeal: DiscoverDealState;
  swap: SwapState;
  pool: PoolState;
};
