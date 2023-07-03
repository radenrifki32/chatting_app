import { HttpStatusCode } from "axios"

 export  interface Product  {
    message : string 
    subject_message : string 
    terkirim_ke : string 
    terkirim_tanggal : string
}


export interface sendMessage {
    message : string
    subject_message : string
    send_to: string
  }

  export interface ressponsePostMessage {
    terkirim_tanggal? : string 
    terkirim_ke? : string
  }
