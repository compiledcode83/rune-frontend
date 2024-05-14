import { toast } from "sonner";
import axiosInstance from "../axios.instance";
import axios, { AxiosError } from "axios";
import { customToast } from "@/components/toast";

const getSwapableTokens = async (tokenUuid: string) => {
  try {
    const response = await axiosInstance.get(`/pool/swapable-tokens`, {
      params: {
        token: tokenUuid,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const getPoolTokens = async () => {
  try {
    const response = await axiosInstance.get(`/pool/tokens`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const getSwapAmount = async (
  sendTokenUuid: string,
  sendTokenAmount: Number,
  receiveTokenUuid: string
) => {
  try {
    const response = await axiosInstance.post(`/pool-transaction/swap/amount`, {
      sendTokenAmount,
      sendTokenUuid,
      receiveTokenUuid,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const getBalance = async (address: string) => {
  try {
    const response = await axiosInstance.get(`/pool-transaction/balance`, {
      params: { ":address": address },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const getLiquidities = async (address: string) => {
  try {
    const response = await axiosInstance.get(`/pool-transaction/pool`, {
      params: { ":address": address },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const generateSwapPsbt = async (
  address: string,
  pubkey: string,
  paymentAddress: string,
  paymentPubkey: string,
  walletType: string,
  sendTokenUuid: string,
  receiveTokenUuid: string,
  sendTokenAmount: number,
  receiveAmount: number
) => {
  try {
    const response = await axiosInstance.post(
      `/pool-transaction/swap/generate-psbt`,
      {
        address,
        pubkey,
        paymentAddress,
        paymentPubkey,
        walletType,
        sendTokenUuid,
        receiveTokenUuid,
        sendTokenAmount,
        receiveAmount,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

const pushTx = async (psbt: string, uuid: string) => {
  try {
    const response = await axiosInstance.post(
      `/pool-transaction/swap/push-tx`,
      {
        psbt,
        uuid,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError type allows access to error response data
      if (error.response) {
        console.log(error.response.data.message); // Access error response data
        customToast({ toastType: "error", title: error.response.data.message });
      } else {
        console.log("Error occurred, but no response was received");
      }
    } else {
      console.log("Non-Axios error occurred:", error);
    }
    throw error;
  }
};

export default {
  getSwapableTokens,
  getPoolTokens,
  getSwapAmount,
  generateSwapPsbt,
  getBalance,
  pushTx,
  getLiquidities,
};
