import { withAuth } from "next-auth/middleware";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(40, "1 h"),
});

export default withAuth(async function middleware(req) {
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
});
