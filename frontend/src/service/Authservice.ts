import axios,{AxiosError, AxiosResponse} from "axios";

import { Auth } from "../types/Auth";
import apiClient from "../axios/axiosClient";
import { RegisterResponse,LoginResponse } from "../types/ResponseType/Auth";


interface CustomAxiosError extends AxiosError<any, any> {
  response?: AxiosResponse<RegisterResponse | LoginResponse| AxiosError<unknown, any>, any>;
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
    if (axiosError.response) {
      const responseData = axiosError.response.data as RegisterResponse;
      throw new Error(responseData.data.message);
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
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response.data as LoginResponse;
        throw new Error(responseData.data.message);
      } else {
        throw error;
      }
    } finally {
    }
  };
const authSerive =  {
    Register,
    Login
}

export default authSerive