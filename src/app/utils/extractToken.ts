import { Request } from "express";

const extractToken = (req: Request): string | undefined => {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader === "string" && authHeader.length > 0) {
        const parts = authHeader.split(" ");
        if (parts.length === 2) return parts[1]
        return authHeader;
    }

    if (req.cookies?.accessToken) return req.cookies.accessToken;
    // if (req.cookies?.refreshToken) return req.cookies.refreshToken;

    const q = req.query as Record<string, unknown>;
    const accessToken = q?.accessToken;
    if (typeof accessToken === "string") return accessToken;
    if (Array.isArray(accessToken) && accessToken.length > 0 && typeof accessToken[0] === "string") return accessToken[0];

    return undefined;
}

export default extractToken;