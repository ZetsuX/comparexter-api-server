import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateAPIData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateAPIData>
) => {
    try {
        const user = await getServerSession(req, res, authOptions).then(
            (res) => res?.user
        );

        if (!user) {
            return res.status(401).json({
                error: "Action unauthorized",
                createdApiKey: null,
            });
        }

        const foundApiKey = await db.APIKey.findFirst({
            where: { userId: user.id, enabled: true },
        });

        if (foundApiKey) {
            return res.status(400).json({
                error: "You already have a valid API Key",
                createdApiKey: null,
            });
        }

        const createdApiKey = await db.APIKey.create({
            data: {
                userId: user.id,
                key: nanoid(),
            },
        });

        return res.status(200).json({
            error: null,
            createdApiKey,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                error: err.issues,
                createdApiKey: null,
            });
        }

        return res.status(500).json({
            error: "Something went wrong",
            createdApiKey: null,
        });
    }
};

export default handler;
