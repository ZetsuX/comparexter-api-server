import React, { FC } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import APIDashboard from "@/components/APIDashboard";
import APIKeyRequest from "@/components/APIKeyRequest";

export const metadata: Metadata = {
    title: "API Server | Dashboard",
    description: "Open-source API usable by everyone",
};

const page = async () => {
    const user = await getServerSession(authOptions);

    if (!user) {
        return notFound();
    }

    const apiKey = await db.APIKey.findFirst({
        where: { userId: user.user.id, enabled: true },
    });

    return (
        <div className="max-w-7xl mx-auto mt-16">
            {apiKey ? <APIDashboard /> : <APIKeyRequest />}
        </div>
    );
};

export default page;
