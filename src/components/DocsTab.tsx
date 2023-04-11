"use client";

import { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import SimpleBar from "simplebar-react";
import { jsCode, pyCode } from "@/utils/documentation-code";
import Code from "@/ui/Code";

const DocsTab: FC = () => {
    return (
        <Tabs defaultValue="js" className="max-w-2xl w-full">
            <TabsList>
                <TabsTrigger value="js">Javascript</TabsTrigger>
                <TabsTrigger value="py">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="js">
                <SimpleBar forceVisible="y">
                    <Code language="javascript" code={jsCode} showed animated />
                </SimpleBar>
            </TabsContent>
            <TabsContent value="py">
                <SimpleBar forceVisible="y">
                    <Code language="python" code={pyCode} showed animated />
                </SimpleBar>
            </TabsContent>
        </Tabs>
    );
};

export default DocsTab;
