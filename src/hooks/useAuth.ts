import { useAppSelector } from "./reduxHooks";


export function useAuth() {
    const { id, email, token, } = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        id,
    }

}