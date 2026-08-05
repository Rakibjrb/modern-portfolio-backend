import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth.middlewares";
import { AboutValidation } from "../validations/about.validations";
import { AboutController } from "../controllers/about.controllers";

const router = Router();

router.get(
    "/",
    AboutController.getAbout
);

router.post(
    "/",
    auth("super_admin"),
    validateRequest(AboutValidation.createAboutReq),
    AboutController.createOrUpdateAbout
);

router.put(
    "/",
    auth("super_admin"),
    validateRequest(AboutValidation.updateAboutReq),
    AboutController.createOrUpdateAbout
);

// router.put(
//     "/:id",
//     auth("super_admin"),
//     validateRequest(AboutValidation.updateAboutReq),
//     AboutController.updateAbout
// );

export const AboutRoutes = router;
