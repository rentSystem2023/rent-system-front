import { create } from 'zustand';

interface UserStore {
    loginNickName: string,
    setLoginNickName: (LoginNickName: string) => void;
    loginUserId: string,
    setLoginUserId: (loginUserId: string) => void;
    loginUserPassword: string,
    setLoginUserPassword: (loginUserPassword: string) => void;
    userEmail: string,
    setUserEmail: (UserEmail: string) => void;
    authNumber: string,
    setAuthNumber: (authNumber: string) => void;
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void; //함수로 지정
    joinDate: string,
    setJoinDate: (JoinDate: string) => void;
}

const useUserStore = create<UserStore>(set => ({
    loginNickName: '',
    setLoginNickName: (loginNickName: string) => set(state => ({...state, loginNickName})),
    loginUserId: '',
    setLoginUserId: (loginUserId: string) => set(state => ({...state, loginUserId})),
    loginUserPassword: '',
    setLoginUserPassword: (loginUserPassword: string) => set(state  => ({...state, loginUserPassword})),
    userEmail: '',
    setUserEmail: (userEmail: string) => set(state => ({...state, userEmail})),
    authNumber: '',
    setAuthNumber: (authNumber: string) => set(state => ({ ...state, authNumber})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole: string) => set(state => ({ ...state, loginUserRole })),
    joinDate: '',
    setJoinDate: (joinDate: string) => set(state => ({...state, joinDate})),
}));

export default useUserStore;