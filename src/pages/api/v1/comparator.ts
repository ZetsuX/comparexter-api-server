import { withMethods } from "@/lib/api-middleware/with-methods";
import { db } from "@/lib/db";
import { compareText } from "@/utils/text-comparator";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
    text1: z.string().max(1000),
    text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body as unknown;

        const apiKey = req.headers.authorization;
        if (!apiKey) {
            return res.status(401).json({
                error: "Action unauthorized",
            });
        }

        const validApiKey = await db.aPIKey.findFirst({
            where: {
                key: apiKey,
                enabled: true,
            },
        });
        if (!validApiKey) {
            return res.status(401).json({
                error: "Action unauthorized",
            });
        }

        const { text1, text2 } = reqSchema.parse(body);

        const start = new Date();
        const diffLocs = await compareText(text1, text2);
        const duration = new Date().getTime() - start.getTime();
        let identical = true;
        let difference_positions = null;

        if (diffLocs.length > 0) {
            identical = false;
            difference_positions = diffLocs;
        }

        await db.aPIRequest.create({
            data: {
                duration,
                method: req.method as string,
                path: req.url as string,
                status: 200,
                apiKeyId: validApiKey.id,
                usedApiKey: validApiKey.key,
            },
        });

        return res.status(200).json({
            success: true,
            text1,
            text2,
            identical,
            difference_positions,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                error: err.issues,
            });
        }

        return res.status(500).json({
            error: "Something went wrong",
        });
    }
};

export default withMethods(["POST"], handler);
