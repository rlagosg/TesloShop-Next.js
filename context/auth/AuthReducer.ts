import { IUser } from '@/interfaces';
import { AuthState } from '.';

type AuthActionType = 
| { type: 'Auth - Login', payload: IUser}
| { type: 'Auth - Logout'}

export const AuthReducer = ( state: AuthState, action: AuthActionType ): AuthState => {
    switch (action.type) {
        case 'Auth - Login':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }

        case 'Auth - Logout':
            return {
                ...state,
                user: undefined,
                isLoggedIn: false
            }    
        default:
            return state;
    }
}