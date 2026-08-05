export interface RegisterUserReq {
    name: string;
    email: string;
    password: string;
    role?: "super_admin";
}

export interface LoginReq {
    email: string;
    password: string;
}

export interface UpdateUserReq {
    role?: "super_admin";
}