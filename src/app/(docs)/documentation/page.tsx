import React, { FC } from "react";

import { Metadata } from "next";
import Heading1 from "@/components/ui/Heading1";
import Paragraph from "@/components/ui/Paragraph";
import DocsTab from "@/components/DocsTab";

import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
    title: "Ze API Server | Documentation",
    description: "Open-source API usable by everyone",
};

const page: FC = () => {
    return (
        <div className="container max-w-7xl mx-auto mt-12">
            <div className="flex flex-col items-center gap-6">
                <Heading1>Creating a request</Heading1>
                <Paragraph>api/v1/apiserver</Paragraph>

                <DocsTab />
            </div>
        </div>
    );
};

export default page;
