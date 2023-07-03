"use client"
import { InputHTMLAttributes, useState } from 'react'

import Input from '../components/InputType/Input'
import authSerive from '../service/Authservice'
import Button from '../components/button/Button'
import { LoginResponse, RegisterResponse } from '../types/ResponseType/Auth'
import { AxiosError, HttpStatusCode } from 'axios'
import {  useRouter } from 'next/navigation'
export default function Home() {
  interface Auth {
    username: string;
    password: string;
  }
  interface RegisterMessage  {
    message : string 
    successMessage : boolean,
    failedMessage : boolean
  }

  const router  = useRouter()
  const [register, setRegister] = useState<Auth>({
    username: "",
    password: ""
  });

const [messageRegister,setMessageRegister] = useState<RegisterMessage>({
  message : "",
  successMessage : false,
  failedMessage : false,
})
const registerUser = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
 const response : LoginResponse | AxiosError<unknown,any> = await authSerive.Login(register)
 console.log(response.data.token)
 if (response.code ===  HttpStatusCode.Ok) {
  localStorage.setItem("token",response.data.token)
  setMessageRegister((prevRegister)=>({
    ...prevRegister,
     message : response.data.message,
     successMessage : true,
     failedMessage : false
    
  }))
  setTimeout(() => { 
    router.push("/dashboard")
   }, 4000)
 }else {
  setMessageRegister((prevRegister)=>({
    ...prevRegister,
     message : response.data.message,
     successMessage : false,
     failedMessage : true
    
  }))
 }
}
const ChangeValue = (e : React.ChangeEvent<HTMLInputElement>)=> {
  console.log(e.target.name)
  setRegister((prevRegister) => ({
    ...prevRegister,
    [e.target.name]: e.target.value,
  }));
  
}
  return (
  <main className='flex items-center justify-center h-screen'>
    <div className='h-full bg-white basis-1/2'>
      <div className='flex items-center justify-center h-full'>
      <form className='w-1/2 bg-[#F7E6C4] rounded-md shadow-md h-1/2'  onSubmit={registerUser}>
        <div className='w-full mt-4 text-center'>
    <h1 className='font-bold text-white text-md '>Cakap Sayangku</h1>
        </div>
        <div className='flex flex-col mx-auto mt-10'>
  <div className='flex flex-col justify-center w-full mx-auto'>
    <div>
    <label className='font-bold '>Username</label>
    <Input className='w-5/6 p-3 mt-2' name='username' type='text' onChange={ChangeValue} />
    </div>
    <div>
    <label className='font-bold '>Password</label>
    <Input className='w-5/6 p-3 mt-2' name='password' type='password' onChange={ChangeValue} />
    </div>
    <div>
      <Button disabled={false} type='submit' className='w-full px-2 py-2'>Register</Button>
    </div>
  </div>
</div> 
            </form>
      </div>
    </div>
    <div className='h-full bg-black basis-1/2'>
      <h1>Ok</h1>
    </div>
  </main>
  )
}
