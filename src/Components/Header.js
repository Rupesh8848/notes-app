import React from 'react'
import {SlDiamond} from "react-icons/sl"
import { Navigate, useNavigate } from 'react-router-dom'
export default function Header() {
    const navigate = useNavigate()
  return (
    <>
        <div className='p-4 flex justify-between sticky top-0 bg-white'>
            <div className='flex justify-center items-center'>
                <SlDiamond/>
                <p>PicStore</p>
            </div>
            <div className=''>
                <ul className='flex justify-center items-center'>
                    <li className='mr-10 cursor-pointer' onClick={()=>navigate("/")}>Home</li>
                    <li className='mr-6 cursor-pointer' onClick={()=>navigate("/sign-in")}>SignIn</li>
                    <li></li>
                </ul>
            </div>
         </div>

         

    </>
  )
}
