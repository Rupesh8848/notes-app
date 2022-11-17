import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {FcGoogle} from "react-icons/fc"
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/Firebase'
export default function GoogleSignIn() {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)

    async function handleClick(){
        setLoading(true)
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user 
        
        const docRef = doc(db,"users",user.uid)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists()){
            await setDoc(docRef,{
                name:user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
            })
        }
        navigate("/")

        console.log(user)         
        } catch (error) {
            toast.error("Failed to log in using Google.")
    }
}

    if(loading){
        return <Spinner/>
    }

  return (
    <>
        <button className='flex justify-center items-center w-full bg-slate-800 text-white py-3
        rounded-lg text-lg' 
        onClick={handleClick}><FcGoogle/><span className='ml-3'>Sign In with Google</span></button>
    </>
  )
}

