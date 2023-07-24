import React ,{SetStateAction} from "react"
export type InputProps <T = unknown> = {
    placeholder ? : string
    name : string
    className? : React.ComponentProps<"div">["className"] 
    type? : "text" | "number" | "password" | string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setInput? :React.Dispatch<SetStateAction<T>>
    input ? : T
}

export interface ButtonProps<T> extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    disabled? : boolean
    type? : "button" | "submit"
    setState? : React.Dispatch<SetStateAction<T>>
    onClick?  : ()=> any
    children? : React.ReactNode
    className? : React.ComponentProps<"div">["className"] 

}
