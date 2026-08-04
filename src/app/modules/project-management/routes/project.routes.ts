import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth.middlewares";
import { ProjectValidation } from "../validations/project.validations";
import { ProjectController } from "../controllers/project.controllers";

const router = Router();

router.get(
    "/",
    ProjectController.getAllProjects
);

router.get(
    "/:slug",
    ProjectController.getProjectBySlug
);

router.post(
    "/",
    auth("super_admin"),
    validateRequest(ProjectValidation.createProjectReq),
    ProjectController.createProject
);

router.put(
    "/:id",
    auth("super_admin"),
    validateRequest(ProjectValidation.updateProjectReq),
    ProjectController.updateProject
);

router.delete(
    "/:id",
    auth("super_admin"),
    ProjectController.deleteProject
);

export const ProjectRoutes = router;
