import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;
    toggleSideMenu: () => void;
}

export const UIContext = createContext({ } as ContextProps);

/*
debes crear:
1- index.ts
1- UIContex.tsx
2- UIProvider.tsx
3- UIReducuer.ts
*/