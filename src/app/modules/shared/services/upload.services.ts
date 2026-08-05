import { cloudinaryManager } from "../../../managers/cloudinary.manager";

export class MediaService {
    static upload = async (file: Buffer) => {
        const result = await cloudinaryManager.uploader(file);
        return result
    }

    static delete = async (public_id: string) => {
        const result = await cloudinaryManager.delete(public_id);
        return result
    }
}