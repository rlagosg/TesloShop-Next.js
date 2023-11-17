import { FC, ReactNode, useReducer } from 'react'
import { UIContext, UIReducer } from '.'

export interface UIState {
    isMenuOpen: boolean
}

interface ProviderProps{
    children: ReactNode
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false
}

export const UIProvider:FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const toggleSideMenu = ()=> {
        dispatch({type: 'UI - ToggleMenu'});
    }

    return (
    <UIContext.Provider value={{ 
        ...state,
        toggleSideMenu,
    }}>
        { children }
    </UIContext.Provider>
    )
}