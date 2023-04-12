import { type ZodIssue } from "zod";
import { ApiKey } from "@prisma/client";

export interface CreateAPIData {
    error: string | ZodIssue[] | null;
    createdApiKey: ApiKey | null;
}

export interface RevokeAPIData {
    error: string | ZodIssue[] | null;
    success: boolean;
}
