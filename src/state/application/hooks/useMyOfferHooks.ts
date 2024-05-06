import { useAppDispatch, useAppSelector } from "@/state/hook";
import { RootState } from "../types";
import { useCallback } from "react";
import {
    MyOfferState,
    setReceivedOffers,
    setSentOffers,
    appendSentOffers,
    appendReceivedOffers,
} from "../slices/myOfferSlice";

export const useSentOffers = () => {
    const dispatch = useAppDispatch();
    const sentOffers = useAppSelector(
        (state: RootState) => state.myOffer.sentOffers
    );

    const setSentOffersCallback = useCallback(
        (items: MyOfferState["sentOffers"]) => dispatch(setSentOffers(items)),
        [dispatch]
    );

    return { sentOffers, setSentOffers: setSentOffersCallback };
};

export const useReceivedOffers = () => {
    const dispatch = useAppDispatch();
    const receivedOffers = useAppSelector(
        (state: RootState) => state.myOffer.receivedOffers
    );

    const setReceivedOffersCallback = useCallback(
        (items: MyOfferState["receivedOffers"]) =>
            dispatch(setReceivedOffers(items)),
        [dispatch]
    );

    return { receivedOffers, setReceivedOffers: setReceivedOffersCallback };
};

export const useAppendSentOffers = () => {
    const dispatch = useAppDispatch();

    const appendSentOffersCallback = useCallback(
        (newOffers: MyOfferState["sentOffers"]) =>
            dispatch(appendSentOffers(newOffers)),
        [dispatch]
    );

    return appendSentOffersCallback;
};

export const useAppendReceivedOffers = () => {
    const dispatch = useAppDispatch();

    const appendReceivedOffersCallback = useCallback(
        (newOffers: MyOfferState["receivedOffers"]) =>
            dispatch(appendReceivedOffers(newOffers)),
        [dispatch]
    );

    return appendReceivedOffersCallback;
};
