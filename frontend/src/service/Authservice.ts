import axios,{AxiosError, AxiosResponse} from "axios";

import { Auth } from "../types/Auth";
import apiClient from "../axios/axiosClient";
import { RegisterResponse,LoginResponse, DataMe, Me } from "../types/ResponseType/Auth";


interface CustomAxiosError extends AxiosError<any, any> {
  response?: AxiosResponse<AxiosError<unknown, any>, any>;
}
const Register = async ({ username, password }: Auth): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await apiClient.post("/user/register", {
      username: username,
      password: password
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as CustomAxiosError;
    if (axiosError?.response) {
      console.log(error)
      const responseData = axiosError?.response;
      console.log(responseData)
      return Promise.reject(responseData?.data?.message)
    } else {
      throw error;
    }
  } finally {
  }
};

  const Login = async ({username,password} : Auth) : Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await apiClient.post("/user/login", {
        username: username,
        password: password
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response) {
        console.log(axiosError)
        const responseData = axiosError.response;
        return Promise.reject(responseData.data.message)
      } else {
        throw new Error()
      }
    } finally {
    }
  };
export const UserMe = async () :Promise<Me | undefined>=>{
  try {
    const response : AxiosResponse<Me>  =  await apiClient.get('/user/me')
    return response.data

  } catch (error :  unknown) {
     const axiosError = error as CustomAxiosError
     if(axiosError?.response){
      const responseData = axiosError?.response
      throw new Error(responseData?.data?.message)
     }
  }
}  

const authSerive =  {
    Register,
    Login,
    UserMe
}

export default authSerive