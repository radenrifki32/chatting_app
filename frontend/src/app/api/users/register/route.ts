import { NextApiRequest,NextApiResponse } from "next";
import axios, { AxiosError,AxiosResponse, HttpStatusCode} from "axios";
import helperResponse from "@/lib/Response";
import { RegisterResponse } from "@/types/ResponseType/Auth";

interface CustomAxiosError extends AxiosError<any,any> {
    response?: AxiosResponse<AxiosError<unknown,any>,any>
}
interface RequestBody {
    username :string 
    password :string
}
export default async function POST (req : NextApiRequest,res: NextApiResponse){
    try {
        const {username,password} : RequestBody  = req.body
const request = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,{
    username : username,
    password : password 
})
console.log(process.env.NEXT_PUBLIC_BASE_URL)
const response = request.data
 return helperResponse.SuccessResponse<RegisterResponse>(res,response.data.status,response.data.data,response.data.message,response.data.data.message)
    } catch (error : unknown) {
       const errorAxios = error as CustomAxiosError
     return helperResponse.ErrorResponse(res,false,errorAxios.response?.data.message as string,errorAxios.status as HttpStatusCode)
    }



}