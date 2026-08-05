import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join((process.cwd()), '.env')
})

export default {
    FRONTEND_URL: process.env.FRONTEND_URL, // main application origin
    ADMIN_DASHBOARD_PANEL_URL: process.env.ADMIN_DASHBOARD_PANEL_URL, // admin dashboard panel origin
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 8001,
    APP_VERSION: process.env.APP_VERSION,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    CLUSTER_URL: process.env.CLUSTER_URL as string,
    DATABASE_NAME: process.env.DATABASE_NAME as string,
    AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    AUTH_TOKEN_EXPIRE_IN: process.env.AUTH_TOKEN_EXPIRE_IN as string,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
}