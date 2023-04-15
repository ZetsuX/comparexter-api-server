import React, { FC } from "react";

import { Metadata } from "next";
import Heading1 from "@/components/ui/Heading1";
import Paragraph from "@/components/ui/Paragraph";
import DocsTab from "@/components/DocsTab";

import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
    title: "Comparexter API | Documentation",
    description: "Open-source Text Comparison API for everyone",
    icons: {
        icon: "/favicon.png",
    },
};

const page: FC = () => {
    return (
        <div className="container max-w-7xl mx-auto mt-12">
            <div className="flex flex-col items-center gap-6">
                <Heading1>Creating a request</Heading1>
                <Paragraph>api/v1/comparator</Paragraph>

                <DocsTab />
            </div>
        </div>
    );
};

export default page;
