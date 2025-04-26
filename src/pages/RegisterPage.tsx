import React from 'react'
import AuthForm from '../components/auth/AuthForm'
import Header from '../components/Header'

import RegisterForm from '../components/auth/Register'


const RegisterPage = () => {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center'>
                <RegisterForm />
            </div>
        </>
    )
}

export default RegisterPage
