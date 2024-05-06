import { useAppDispatch, useAppSelector } from "@/state/hook";
import { RootState } from "../types";
import { useCallback } from "react";
import {
    setRecentOffers,
    setOngoingOffers,
    appendRecentOffers,
} from "../slices/discoverDealSlice";
import { HistoryOfferProps, SendingOfferProps } from "@/propsType";

export const useOngoingOffers = () => {
    const dispatch = useAppDispatch();
    const ongoingOffers = useAppSelector(
        (state: RootState) => state.discoverDeal.ongoingOffers
    );

    const setSendingOffersCallback = useCallback(
        (items: SendingOfferProps[]) => dispatch(setOngoingOffers(items)),
        [dispatch]
    );

    return { ongoingOffers, setOngoingOffers: setSendingOffersCallback };
};

export const useRecentOffers = () => {
    const dispatch = useAppDispatch();
    const recentOffers = useAppSelector(
        (state: RootState) => state.discoverDeal.recentOffers
    );

    const setRecentOffersCallback = useCallback(
        (items: HistoryOfferProps[]) => dispatch(setRecentOffers(items)),
        [dispatch]
    );

    return { recentOffers, setRecentOffers: setRecentOffersCallback };
};

export const useAppendRecentOffers = () => {
    const dispatch = useAppDispatch();

    const appendRecentOffersCallback = useCallback(
        (newOffers: HistoryOfferProps[]) =>
            dispatch(appendRecentOffers(newOffers)),
        [dispatch]
    );

    return appendRecentOffersCallback;
};
