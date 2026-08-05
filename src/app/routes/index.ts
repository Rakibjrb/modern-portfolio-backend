import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth.routes";
import { ProjectRoutes } from "../modules/project-management/routes/project.routes";
import { uploadRoutes } from "../modules/shared/routes/upload.routes";

interface IRoute {
    path: string;
    router: Router;
}

const router = Router();


const moduleRoutes: IRoute[] = [
    {
        path: "/auth",
        router: AuthRoutes
    },
    {
        path: "/projects",
        router: ProjectRoutes
    },
    {
        path: "/public",
        router: uploadRoutes
    }
]

moduleRoutes.forEach((routes: IRoute) => {
    router.use(routes.path, routes.router)
})

export default router;