import {  getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GoogleSignIn from '../Components/GoogleSignIn'

export default function SignIn() {

    
    const navigate = useNavigate()

    const [loginData, setLoginData] = React.useState({
        email:'',
        password:'',
    })
    const {email, password} = loginData

    async function handleButtonClick(event){
        event.preventDefault()
        try {
            const auth = getAuth()
            const userCredential =await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            if(user){
                navigate("/")
            }
    
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                toast.error("Please check your email.")
            }
            else if(error.code === "auth/wrong-password"){
                toast.error("Please check your password")
            }
            else{
                toast.error("Something went wrong.")
            }
        }
    }

    function handleChange(event){
        setLoginData(oldState =>({
            ...oldState,
            [event.target.id]:event.target.value,
        }))
    }


  return (
    <>
        <section className='grid h-screen place-items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'>
            <div className='bg-white rounded-3xl p-8 '>
                <h1 className='font-bold text-3xl text-center text'>Sign In</h1>
                <hr className='border-5 mb-6 border-slate-900'/>
                <form className='mb-5' >
                    <input placeholder='Email' type="email" required 
                    className='w-full border-b-2 h-10  border-slate-500 mb-6 text-center text-xl
                    focus:outline-none
                    ' onChange={handleChange}
                    id="email" value={email}/>
                    <br />
                    <input placeholder='Password' type="password" required
                    className='w-full border-b-2 h-10  border-slate-500 text-center text-xl
                    focus:outline-none' onChange={handleChange} id="password" value={password}
                    />

                    <div className='flex  justify-between items-baseline'>
                    <button className='text-center bg-slate-800 text-white text-lg p-3 rounded-lg mt-3 cursor-pointer' onClick={handleButtonClick}>Sign In</button>
                    <Link to="/forgot-password">
                        <p>Forgot Password?</p>
                    </Link>
                    </div>
                </form>

                <p className='text-center font-bold'>OR</p>

                <GoogleSignIn />

            </div>
        </section>
    </>
  )
}
