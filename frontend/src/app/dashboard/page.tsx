"use client"
import React, { useEffect, useState } from 'react'
import ServiceProduct from '../../service/productService'
import { Product, sendMessage } from '../../types/product'
import Input from '../../components/InputType/Input'
import Button from '../../components/button/Button'
interface Data {
  message : string 
  subject_message : string 
  terkirim_ke : string 
  terkirim_tanggal : string
  
}


const dashboard = () => {

  const [data, setDatas] = useState<Product[]>([]);
  const [postMessage,setPostMessage] = useState<sendMessage> ({
    message :"",
    subject_message : "",
    send_to : ""

  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await ServiceProduct.getMessage();
        console.log(datas)
        setDatas(datas)
     
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);
  const postMessages = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
   const response = await ServiceProduct.postMessage(postMessage)
   console.log(response)
  }
  const changeMessage = (e : React.ChangeEvent<HTMLInputElement>)=>{
 setPostMessage((prev)=>({
  ...prev,
  [e.target.name] : e.target.value
 }))
  }
  return (
    <div>
    <div>Your Message</div>

    {data?.length > 0 ? (
      <div className='w-full h-32 bg-black'>
        {data?.map((e: Product, index: number) => (
          <div className='w-full mt-2 bg-red-200 h-1/4' key={index}>{e.terkirim_ke}</div>
        ))}
      </div>
    ) : (
      <div>{data?.length}</div>
    )}
    <div>send Your Message</div>
    <form onSubmit={postMessages}>
      <Input name='message' onChange={changeMessage} type='text'/>
      <Input name='subject_message' onChange={changeMessage} type='text'/>
      <Input name='send_to' onChange={changeMessage} type='text'/>
      <Button type='submit'>Post Message</Button>
    </form>
  </div>

  )

}

export default dashboard