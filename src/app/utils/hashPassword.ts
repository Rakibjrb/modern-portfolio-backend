import bcrypt from "bcryptjs";
import env from "../config/env";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, Number(env.BCRYPT_SALT_ROUNDS));
}