import React from 'react'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import AuthForm from '../components/auth/AuthForm'
import Header from '../components/Header'
import LoginForm from '../components/auth/Login';



const LoginPage = () => {


    return (
        <>
            <Header />
            <div className='flex justify-center items-center'>
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage
