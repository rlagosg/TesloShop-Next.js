import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"

import { AuthContext, AuthReducer } from '.'
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

interface ProviderProps{
    children: ReactNode
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider:FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        
        if ( status === 'authenticated' ) {
            //console.log({user: data?.user});
            dispatch({ type: 'Auth - Login', payload: data?.user as IUser })
        } 
    
    }, [ status, data ])


    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async ()=> {

        if( !Cookies.get('token')){
            return;
        }
        
        try {
            const { data } = await tesloApi.get('/users/validate-token');
            const { token, usuario } = data;
    
            Cookies.set('token', token);
            dispatch({ type: 'Auth - Login', payload: usuario});
            
        } catch (error) {
            Cookies.remove('token');
        }

    }
    

    const loginUser = async ( email: string, password: string) : Promise<boolean>=>{
        try {
            const { data } = await tesloApi.post('/users/login', { email, password});
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'Auth - Login', payload: user});
            return true;

        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string) : Promise<{hasError: boolean; message?: string}>=>{
        try {
            const { data } = await tesloApi.post('/users/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: 'Auth - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {

        /* Autenticacion personalizada */
        //Cookies.remove('token');
        //Cookies.remove('cart');

        /* Autenticación con JWT - NextAuth*/
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');

        signOut();
        
        //router.reload();
    }

    return (
    <AuthContext.Provider value={{ 
        ...state,
        loginUser,
        registerUser,
        logout
    }}>
        { children }
    </AuthContext.Provider>
    )
}