import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/loginAction';
import { CheckAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/registerAction';

type AuthStatus = 'authenticated' | 'not-athenticated' | 'checking'

type AuthState = {
    //Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    //Getters
    isAdmin: () => boolean
    //Actions
    login: (email: string, password: string) => Promise<boolean>
    register: (fullName: string, email: string, password: string) => Promise<boolean>
    logOut: () => void;
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //Implementar el Store
    user: null,
    token: null,
    authStatus: 'checking',

    //Getters
    isAdmin: () => {
        const user = get().user?.roles || [];
        return user.includes('admin')
    },

    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-athenticated' })
            return false
        }
    },

    register: async (fullName: string, email: string, password: string) => {
        try {
            const data = await registerAction(fullName, email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-athenticated' })
            return false
        }

    },

    logOut: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-athenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { token, user } = await CheckAuthAction();
            set({ user: user, token: token, authStatus: 'authenticated' });
            return true

        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-athenticated' })
            return false
        }
    }
}))

