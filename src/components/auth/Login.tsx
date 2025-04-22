import React from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';
import { setUser } from '../../store/slices/userSlice';
import AuthForm from './AuthForm';

const LoginForm = () => {
    const dispatch = useAppDispatch()

    const auth = getAuth()
    const navigate = useNavigate()
    function handleLogin(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const token = await user.getIdToken();

                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: token,
                }));
                navigate('/')
            })
    }



    return (
        <div>
            <AuthForm title='login' handleClick={handleLogin} />
        </div>
    )
}

export default LoginForm
