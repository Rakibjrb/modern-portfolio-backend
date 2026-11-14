import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth.middlewares";
import { ExperienceValidation } from "../validations/experience.validations";
import { ExperienceController } from "../controllers/experience.controllers";

const router = Router();

// get professional & academic experiences as combined
router.get("/", ExperienceController.getExperiences);

router.post(
  "/professional",
  validateRequest(ExperienceValidation.createProfessionalExperienceReq),
  auth("super_admin"),
  ExperienceController.createProfessionalExperience,
);
router.post(
  "/academic",
  validateRequest(ExperienceValidation.createAcademicExperienceReq),
  auth("super_admin"),
  ExperienceController.createAcademicExperience,
);

router.put(
  "/professional/:id",
  validateRequest(ExperienceValidation.updateProfessionalExperienceReq),
  auth("super_admin"),
  ExperienceController.updateProfessionalExperience,
);
router.put(
  "/academic/:id",
  validateRequest(ExperienceValidation.updateAcademicExperienceReq),
  auth("super_admin"),
  ExperienceController.updateAcademicExperience,
);

router.delete(
  "/professional/:id",
  auth("super_admin"),
  ExperienceController.deleteProfessionalExperience,
);
router.delete(
  "/academic/:id",
  auth("super_admin"),
  ExperienceController.deleteAcademicExperience,
);

export const ExperienceRoutes = router;
