import React from 'react'

import Header from '../components/Header'
import LoginForm from '../components/auth/LoginForm';



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
