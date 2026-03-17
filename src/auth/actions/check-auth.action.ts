import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interface/auth.response"


export const CheckAuthAction = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Not Found Token')
    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status')
        localStorage.setItem('token', data.token)
        return data
    } catch (error) {
        console.log({ error });
        localStorage.removeItem('token');
        throw new Error('Token Expired')
    }
}
