import { toast } from "sonner";
import axiosInstance from "../axios.instance";
import axios, { AxiosError } from "axios";
import { customToast } from "@/components/toast";

const getTokenInfo = async (runeId: string) => {
  try {
    const response = await axiosInstance.get(`/token/info`, {
      params: {
        runeId: runeId,
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

export default {
  getTokenInfo,
};
