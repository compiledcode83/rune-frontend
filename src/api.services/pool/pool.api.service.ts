import axiosInstance from "../axios.instance";

const getSwapableTokens = async (tokenUuid: string) => {
  try {
    const response = await axiosInstance.get(`/pool/swapable-tokens`, {
      params: {
        token: tokenUuid,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pool tokens:", error);
    throw error;
  }
};

const getPoolTokens = async () => {
  try {
    const response = await axiosInstance.get(`/pool/tokens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pool tokens:", error);
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
    console.error("Error fetching pool tokens:", error);
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
    console.error("Error fetching pool tokens:", error);
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
    console.error("Error fetching pool tokens:", error);
    throw error;
  }
};

export default {
  getSwapableTokens,
  getPoolTokens,
  getSwapAmount,
  generateSwapPsbt,
  pushTx,
};
