import { withAuth } from "next-auth/middleware";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
});

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;

        if (pathName.startsWith("/api")) {
            const ip = req.ip ?? "127.0.0.1";

            try {
                const { success } = await rateLimit.limit(ip);
                if (!success)
                    return NextResponse.json({
                        error: "Too many requests",
                    });
                return NextResponse.next();
            } catch (err) {
                return NextResponse.json({
                    error: "Something went wrong",
                });
            }
        }

        const token = await getToken({ req });
        const isAuthed = !!token;
        const isOnAuthPage = pathName.startsWith("/login");

        const sensiRoutes = ["/dashboard"];

        if (isOnAuthPage) {
            if (isAuthed) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }

            return null;
        }

        if (sensiRoutes.some((r) => pathName.startsWith(r)) && !isAuthed) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
        // To handle redirect on auth pages so the middleware above is always called
    }
);

export const config = {
    appliedRoutes: ["/", "login", "/dashboard/:path*", "/api/:path*"],
};
