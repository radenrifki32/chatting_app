import axios, { AxiosError, AxiosResponse } from "axios";
import apiClient from "../axios/axiosClient";
import {  Product, ressponsePostMessage, sendMessage } from "../types/product";



const getMessage = async (): Promise<Product[]> => {
    try {
      const response :AxiosResponse = await apiClient.get("/allmessage");
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postMessage = async (payload: sendMessage): Promise<ressponsePostMessage | AxiosError<any,any> | undefined > => {
    try {
      const response :AxiosResponse =  await apiClient.post("/message", payload);
      return response.data;
    } catch (error) {
      if(error instanceof AxiosError){
        return error
      }
    
    }
  };

const ServiceProduct = {
    getMessage,
    postMessage
}

export default ServiceProduct