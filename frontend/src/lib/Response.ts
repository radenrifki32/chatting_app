import { HttpStatusCode } from "axios"
import { NextApiResponse } from "next"
const SuccessResponse = <T> ( res :NextApiResponse,  status : boolean ,data : T,message : string,statusCode : HttpStatusCode)=> {
return res.status(statusCode).json({
    status : status,
    data : data,
    message : message
})
}
const ErrorResponse = ( res :NextApiResponse,  status : boolean,message : string,statusCode : HttpStatusCode)=> {
    return res.status(statusCode).json({
        status : status,
        message : message
    })
    }

  const helperResponse = {
    ErrorResponse,
    SuccessResponse
  }  
export default helperResponse