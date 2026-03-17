import type { User } from "@/interfaces/user.interface";

//login , register, chechkStatus
export interface AuthResponse {
    user: User;
    token: string;
}
