import {HttpStatusCode } from "axios"


export interface DataRegister {
  username: string;
  message: string;
  created_at: string;
}
export interface DataMe {
  username : string
  iamge_url : string
}

export interface DataLogin {
  username : string 
       createdAt : string 
       token : string
       message : string
}
export interface RegisterResponse {
  code: HttpStatusCode ;
  status: boolean;
  data: DataRegister;
}

export interface LoginResponse {
  code: HttpStatusCode ;
  status: boolean;
  data : DataLogin
}
export interface Me {
  code: HttpStatusCode ;
  status: boolean;
data : DataMe

}
   