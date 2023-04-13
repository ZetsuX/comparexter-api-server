import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { formatDistance } from "date-fns";
import Heading1 from "@/ui/Heading1";
import Paragraph from "@/ui/Paragraph";
import { Input } from "@/ui/Input";
import CopyButton from "@/components/CopyButton";
import Table from "@/ui/Table";

const APIDashboard = async () => {
    const user = await getServerSession(authOptions);
    if (!user) {
        notFound();
    }

    const apiKeys = await db.aPIKey.findMany({
        where: { userId: user.user.id },
    });

    const activeApiKey = apiKeys.find((key) => key.enabled);

    if (!activeApiKey) {
        notFound();
    }

    const userRequests = await db.aPIRequest.findMany({
        where: {
            apiKeyId: {
                in: apiKeys.map((key) => key.id),
            },
        },
    });

    const serializeableRequest = userRequests.map((r) => ({
        ...r,
        timestamp: formatDistance(new Date(r.timestamp), new Date()),
    }));

    return (
        <div className="container flex flex-col gap-6">
            <Heading1>Greetings, {user.user.name}</Heading1>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <Paragraph>Your Active API key: </Paragraph>
                <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg relative">
                    <Input
                        className="border-none w-fit truncate pr-12"
                        readOnly
                        value={activeApiKey.key}
                    />
                    <CopyButton
                        className="absolute inset-y-0 right-0 bg-slate-300 dark:bg-slate-700"
                        copyValue={activeApiKey.key}
                    />
                </div>
            </div>

            <Paragraph className="text-center md:text-left mt-4 -mb-4">
                Your API Key History:
            </Paragraph>

            <Table userRequests={serializeableRequest} />
        </div>
    );
};

export default APIDashboard;
