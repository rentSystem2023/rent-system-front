import { create } from 'zustand';

interface AuthStore { 
    joinPath: string;
    snsId: string | undefined;

    setJoinPath: (joinPath: string) => void;
    setSnsId: (snsId: string | undefined) => void;
}

const useAuthStore = create<AuthStore>(set => ({
    joinPath: 'HOME',
    snsId: undefined,
    
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),
    setSnsId: (snsId: string | undefined) => set(state => ({...state, snsId})),
}));

export default useAuthStore;