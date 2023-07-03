import axios, { AxiosResponse } from "axios";
import apiClient from "../axios/axiosClient";
import {  Product, ressponsePostMessage, sendMessage } from "../types/product";



const getMessage = async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get("/allmessage");
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postMessage = async (payload: sendMessage): Promise<ressponsePostMessage> => {
    try {
      const response = await apiClient.post("/message", payload);
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

const ServiceProduct = {
    getMessage,
    postMessage
}

export default ServiceProduct