import { v2 as cloudinary } from "cloudinary";
import env from "../config/env";

interface ICloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

export class CloudinaryManager {
    private cloudinaryConfig: ICloudinaryConfig = {
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
    }

    constructor() {
        cloudinary.config({
            cloud_name: this.cloudinaryConfig.cloud_name,
            api_key: this.cloudinaryConfig.api_key,
            api_secret: this.cloudinaryConfig.api_secret,
        });
    }

    public uploader = async (file: Buffer): Promise<{ url: string, public_id: string }> => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
                if (err) {
                    return reject(err)
                }
                if (result) {
                    resolve({ url: result.url, public_id: result.public_id })
                }
            })

            uploadStream.end(file)
        })
    }

    public delete = async (public_id: string): Promise<string> => {
        if (!public_id) {
            return "public_id is required"
        }
        await cloudinary.uploader.destroy(public_id)
        return "deleted successfully"
    }
}

export const cloudinaryManager = new CloudinaryManager();