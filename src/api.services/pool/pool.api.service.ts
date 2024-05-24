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
    // const {} = response.data;
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

const getBalance = async (address: string, paymentAddress: string) => {
  try {
    const response = await axiosInstance.get(`/pool-transaction/balance`, {
      params: { address, "payment-address": paymentAddress },
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

const getLiquidityTokenAmount = async (address: string, poolUuid: string) => {
  try {
    const response = await axiosInstance.post(
      `/pool-transaction/remove-liquidity/token-amount`,
      {
        address,
        poolUuid,
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

const getAddLiquidityTokenAmount = async (
  poolUuid: string,
  tokenAmount: number,
  type: string
) => {
  try {
    let response;
    if (type === "A") {
      response = await axiosInstance.post(
        `/pool-transaction/add-liquidity/token-amount`,
        {
          poolUuid,
          tokenAAmount: tokenAmount,
        }
      );
      return response.data;
    } else {
      response = await axiosInstance.post(
        `/pool-transaction/add-liquidity/token-amount`,
        {
          poolUuid,
          tokenBAmount: tokenAmount,
        }
      );
      return response.data;
    }
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

const getPoolInfo = async (tokenAUuid: string, tokenBUuid: string) => {
  try {
    const response = await axiosInstance.get(`/pool/info`, {
      params: {
        tokenAUuid,
        tokenBUuid,
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

const pushTx = async (
  psbt: string,
  uuid: string,
  walletType: string,
  paymentSignIndexes: number[],
  taprootSignIndexes: number[]
) => {
  try {
    const response = await axiosInstance.post(`/pool-transaction/push-tx`, {
      psbt,
      uuid,
      walletType,
      paymentSignIndexes,
      taprootSignIndexes,
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
  }
};

const generateAddLiquidityPsbt = async (
  address: string,
  pubkey: string,
  paymentAddress: string,
  paymentPubkey: string,
  walletType: string,
  poolUuid: string,
  tokenAAmount: number,
  tokenBAmount: number
) => {
  try {
    const response = await axiosInstance.post(
      `/pool-transaction/add-liquidity/generate-psbt`,
      {
        address,
        pubkey,
        paymentAddress,
        paymentPubkey,
        walletType,
        poolUuid,
        tokenAAmount,
        tokenBAmount,
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

const generateRemoveLiquidityPsbt = async (
  address: string,
  pubkey: string,
  paymentAddress: string,
  paymentPubkey: string,
  walletType: string,
  poolUuid: string
) => {
  try {
    const response = await axiosInstance.post(
      `/pool-transaction/remove-liquidity/generate-psbt`,
      {
        address,
        pubkey,
        paymentAddress,
        paymentPubkey,
        walletType,
        poolUuid,
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

const getCollectFeeAmount = async (address: string, uuid: string) => {
  try {
    const response = await axiosInstance.get(`reward/balance`, {
      params: { ":address": address, ":pool": uuid },
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

const generateCollectFeePsbt = async (
  address: string,
  pubkey: string,
  paymentAddress: string,
  paymentPubkey: string,
  walletType: string,
  poolUuid: string
) => {
  try {
    const response = await axiosInstance.post(`/reward/claim/generate-psbt`, {
      address,
      pubkey,
      paymentAddress,
      paymentPubkey,
      walletType,
      poolUuid,
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

const pushRewardTx = async (
  psbt: string,
  uuid: string,
  walletType: string,
  paymentSignIndexes: number[],
  taprootSignIndexes: number[]
) => {
  try {
    const response = await axiosInstance.post(`/reward/push-tx`, {
      psbt,
      uuid,
      walletType,
      paymentSignIndexes,
      taprootSignIndexes,
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
  getLiquidityTokenAmount,
  getAddLiquidityTokenAmount,
  generateAddLiquidityPsbt,
  generateRemoveLiquidityPsbt,
  getPoolInfo,
  getCollectFeeAmount,
  generateCollectFeePsbt,
  pushRewardTx,
};
