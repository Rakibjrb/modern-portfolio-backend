import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth.routes";
import { ProjectRoutes } from "../modules/project-management/routes/project.routes";
import { uploadRoutes } from "../modules/shared/routes/upload.routes";
import { AboutRoutes } from "../modules/about/routes/about.routes";
import { ContactRoutes } from "../modules/contact/routes/contact.routes";
import { ExperienceRoutes } from "../modules/experience/routes/experience.routes";

interface IRoute {
  path: string;
  router: Router;
}

const router = Router();

const moduleRoutes: IRoute[] = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/projects",
    router: ProjectRoutes,
  },
  {
    path: "/public",
    router: uploadRoutes,
  },
  {
    path: "/about",
    router: AboutRoutes,
  },
  {
    path: "/contacts",
    router: ContactRoutes,
  },
  {
    path: "/experiences",
    router: ExperienceRoutes,
  },
];

moduleRoutes.forEach((routes: IRoute) => {
  router.use(routes.path, routes.router);
});

export default router;
