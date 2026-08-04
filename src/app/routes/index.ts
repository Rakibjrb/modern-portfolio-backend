import { Router } from "express";

interface IRoute {
    path: string;
    router: Router;
}

const router = Router();


const moduleRoutes: IRoute[] = []

moduleRoutes.forEach((routes: IRoute) => {
    router.use(routes.path, routes.router)
})

export default router;