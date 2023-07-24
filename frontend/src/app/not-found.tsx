'use client'
import Link from 'next/link'
import { useState } from 'react'
import {motion,AnimatePresence,Reorder,MotionConfig} from 'framer-motion'

export default function NotFound() {
    const [isHovered,setHovered]  = useState<boolean>(false)
    const [items, setItems] = useState<number[]>([0, 1, 2])

    const buttonVariant= {
        active: {
            backgroundColor: "#f00"
        },
        inactive: {
          backgroundColor: "#fff",
          transition: { duration: 2 }
        }
      }
  return (
  <main>
    <div className='w-screen h-screen bg-black'>
    <MotionConfig transition={{type:'spring'}}>
    <motion.div animate={{ x : 10 ,y : 20,color:"red"}}>
 <h1>OKKKKKK</h1>
</motion.div>
    </MotionConfig>
    <Reorder.Group values={items} onReorder={setItems}>
        {items.map((item) => <Reorder.Item color='black' key={item} value={item} />)}
        </Reorder.Group>
        <motion.button
  whileTap="tap"
  whileHover="hover"
  variants={buttonVariant}
>
<motion.div whileTap={{ scale: 2 }}>
  <button onPointerDownCapture={e => e.stopPropagation()} />
</motion.div>
</motion.button>
    </div>
   
   
       

  </main>
  )
}