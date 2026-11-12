import { Router } from "express";
import { uploadFile } from "../../../middlewares/upload.middleware";
import { uploadMedia } from "../controllers/upload.controllers";
import auth from "../../../middlewares/auth.middlewares";
import { deleteMedia } from "../controllers/delete.controller";

const router = Router();

router.post("/upload/image", auth("super_admin"), uploadFile, uploadMedia);
router.delete("/image/:public_id", auth("super_admin"), deleteMedia);

export const uploadRoutes = router;
