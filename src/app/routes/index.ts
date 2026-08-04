import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth.routes";

interface IRoute {
    path: string;
    router: Router;
}

const router = Router();


const moduleRoutes: IRoute[] = [
    {
        path: "/auth",
        router: AuthRoutes
    }
]

moduleRoutes.forEach((routes: IRoute) => {
    router.use(routes.path, routes.router)
})

export default router;