import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join((process.cwd()), '.env')
})

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8001,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    APP_VERSION: process.env.APP_VERSION || '1.0.0',
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 10,
    CLUSTER_URL: process.env.CLUSTER_URL as string,
    DATABASE_NAME: process.env.DATABASE_NAME as string
}