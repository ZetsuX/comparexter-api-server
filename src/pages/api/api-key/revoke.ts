import { withMethods } from "@/lib/api-middleware/with-methods";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RevokeAPIData } from "@/types/api";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<RevokeAPIData>
) => {
    try {
        const user = await getServerSession(req, res, authOptions).then(
            (res) => res?.user
        );
        if (!user) {
            return res.status(401).json({
                error: "Action unauthorized",
                success: false,
            });
        }

        const validApiKey = await db.aPIKey.findFirst({
            where: { userId: user.id, enabled: true },
        });
        if (!validApiKey) {
            return res.status(500).json({
                error: "API Key cannot be revoked",
                success: false,
            });
        }

        await db.aPIKey.update({
            where: { id: validApiKey.id },
            data: { enabled: false },
        });

        return res.status(200).json({
            error: null,
            success: true,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                error: err.issues,
                success: false,
            });
        }

        return res.status(500).json({
            error: "Something went wrong",
            success: false,
        });
    }
};

export default withMethods(["POST"], handler);
