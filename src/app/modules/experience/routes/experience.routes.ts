import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth.middlewares";
import { ExperienceValidation } from "../validations/experience.validations";
import { ExperienceController } from "../controllers/experience.controllers";

const router = Router();

router.get(
    "/",
    ExperienceController.getExperiences
);

router.post(
    "/",
    auth("super_admin"),
    validateRequest(ExperienceValidation.createExperienceReq),
    ExperienceController.createExperience
);

router.put(
    "/:id",
    auth("super_admin"),
    validateRequest(ExperienceValidation.updateExperienceReq),
    ExperienceController.updateExperience
);

// router.delete(
//     "/:id",
//     auth("super_admin"),
//     ExperienceController.deleteExperience
// );

export const ExperienceRoutes = router;
