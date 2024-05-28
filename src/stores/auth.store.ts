import { create } from 'zustand';

interface AuthStore { 
    id: string;
    setId: (id: string) => void;
    password: string;
    setPassword: (password: string) => void;
    nickName: string;
    setNickName: (nickname: string) => void;
    email: string;
    setEmail: (email: string) => void;
    authNumber: string;
    setAuthNumber: (authNumber: string) => void;
    joinPath: string;
    setJoinPath: (joinPath: string) => void;
    snsId: string | undefined;
    setSnsId: (snsId: string | undefined) => void;
}

const useAuthStore = create<AuthStore>(set => ({
    id: '',
    setId: (id: string) => set(state => ({ ...state, id})),

    password: '',
    setPassword: (password: string) => set(state => ({ ...state, password})),

    nickName: '',
    setNickName: (nickName: string) => set(state => ({ ...state, nickName})),

    email: '',
    setEmail: (email: string) => set(state => ({ ...state, email})),

    authNumber: '',
    setAuthNumber: (authNumber: string) => set(state => ({ ...state, authNumber})),

    joinPath: 'HOME',
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),
    
    snsId: undefined,
    setSnsId: (snsId: string | undefined) => set(state => ({...state, snsId})),

}))

export default useAuthStore;