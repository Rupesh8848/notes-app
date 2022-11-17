import {  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GoogleSignIn from '../Components/GoogleSignIn'
import Spinner from '../Components/Spinner'
import { db } from '../firebase/Firebase'

export default function SignIn() {

    const auth = getAuth()
    const navigate = useNavigate()

    const [signUpData, setSignUpData] = React.useState({
        name:'',
        email:'',
        password:'',
    })
    const [loading, setLoading] = React.useState(false)
    const {name ,email, password} = signUpData

    async function handleButtonClick(event){
        setLoading(true)
        try {
            event.preventDefault()
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user =  userCredential.user
            console.log(user.uid)
            const signUpDataCopy = {
                ...signUpData,
                timestamp: serverTimestamp(),
            }
            delete signUpDataCopy.password
            console.log(signUpDataCopy)
            const docRef = doc(db,"users",user.uid)
            const docSnap =await getDoc(docRef)
            if(!docSnap.exists()){
                await setDoc(docRef,signUpDataCopy)
            }
            setLoading(false)
            navigate("/")
        } catch (error) {
            setLoading(false)
            toast.error("Error signing up.")
        }
        
    }

    function handleChange(event){
        setSignUpData(oldState =>({
            ...oldState,
            [event.target.id]:event.target.value,
        }))
    }

    if(loading){
        return <Spinner />
    }

    return (
    <>
        <section className='grid h-screen place-items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'>
            <div className='bg-white rounded-3xl p-8 '>
                <h1 className='font-bold text-3xl text-center text'>Sign Up</h1>
                <hr className='border-5 mb-6 border-slate-900'/>
                <form className='mb-5' >
                <input placeholder='Full Name' type="email" required 
                    className='w-full border-b-2 h-10  border-slate-500 mb-6 text-center text-xl
                    focus:outline-none
                    ' onChange={handleChange}
                    id="name" value={name}/>
                    <br/>


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
                    <button className='text-center bg-slate-800 text-white text-lg p-3 rounded-lg mt-3 cursor-pointer' onClick={handleButtonClick}>Sign Up</button>
                    <Link to="/sign-in">
                        <p>Sign In instead?</p>
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
