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
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    FRONTEND_FORM_TOKEN: process.env.FRONTEND_FORM_TOKEN as string,
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || process.env.EMAIL_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || process.env.EMAIL_PASS || '',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.RECEIVER_EMAIL || process.env.SMTP_USER || 'rakibul572157@gmail.com',
}