import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth.routes";
import { ProjectRoutes } from "../modules/project-management/routes/project.routes";

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
    }
]

moduleRoutes.forEach((routes: IRoute) => {
    router.use(routes.path, routes.router)
})

export default router;