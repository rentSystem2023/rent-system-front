import { create } from 'zustand';

interface AuthStore { 
    joinPath: string;
    setJoinPath: (joinPath: string) => void;
    snsId: string | undefined;
    setSnsId: (snsId: string | undefined) => void;
}

const useAuthStore = create<AuthStore>(set => ({

    joinPath: 'HOME',
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),
    
    snsId: undefined,
    setSnsId: (snsId: string | undefined) => set(state => ({...state, snsId})),

}))

export default useAuthStore;