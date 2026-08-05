import { Router } from "express";
import { uploadFile } from "../../../middlewares/upload.middleware";
import { uploadMedia } from "../controllers/upload.controllers";

const router = Router();

router.post("/upload/image", uploadFile, uploadMedia)

export const uploadRoutes = router;