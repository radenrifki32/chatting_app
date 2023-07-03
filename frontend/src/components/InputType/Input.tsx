"use client"
import { InputProps } from "@/types/allPropsType";
import React from "react";
 const Input :React.FC<InputProps<any>> = ({placeholder,type,onChange,setInput,input,className,name})=> {
    
    return (
        <>
 <input className={className} type={type} name={name} placeholder={placeholder ?? ""} onChange={onChange} />
        </>
    )
 }

 export default Input