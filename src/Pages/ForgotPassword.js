import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
    const [email, setEmail] = React.useState('')

    function handleChange(event){
        setEmail(event.target.value)
    }


    async function handleButtonClick(event){
        event.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth,email)
        } catch (error) {
            toast.error("Couldn't send email.")
        }
    }
  return (
    <>
        <section className='grid h-screen place-items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'>
            <div className='bg-white rounded-3xl p-8 text-center'>
                <h1 className='font-bold text-3xl text-center text'>Password Reset</h1>
                <hr className='border-5 mb-6 border-slate-900'/>
                <form className='mb-5' >
                    <input placeholder='Email' type="email" required 
                    className='w-full border-b-2 h-10  border-slate-500 mb-6 text-center text-xl
                    focus:outline-none
                    ' onChange={handleChange}
                    id="email" value={email}/>

                    <button className='text-center bg-slate-800 text-white text-lg p-3 rounded-lg mt-3 cursor-pointer' onClick={handleButtonClick}>Send Reset Email</button>
                    
                </form>
            </div>
        </section>
    </>
  )
}
