import { create } from "zustand"; // domain X

interface UserStore {
    loginUserId: string,
    setLoginUserId: (loginUserId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void, 
}

const useUserStore = create<UserStore>(set => ({
    // 객체
    loginUserId: '',
    setLoginUserId: (loginUserId: string) => set(state => ({ ...state, loginUserId })),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole: string) => set(state => ({ ...state, loginUserRole }))
}));

export default useUserStore;