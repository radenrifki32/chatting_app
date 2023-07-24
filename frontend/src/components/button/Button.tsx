import { Auth } from '@/types/Auth'
import { ButtonProps } from '@/types/allPropsType'
import React from 'react'

const Button : React.FC<ButtonProps<any>> = ({disabled,children,setState,onClick,type,className}) => {
  return (
    <div>
        <button className={className} disabled={disabled} type={type} onClick={onClick}>{children}</button>
    </div>
  )
}

export default Button