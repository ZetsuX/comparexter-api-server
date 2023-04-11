import React, { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
// import { SimpleBar } from "simplebar-react";
import { jsCode } from "@/utils/documentation-code";
import Code from "@/ui/Code";

const DocsTab: FC = () => {
    return (
        <Tabs defaultValue="js" className="max-w-2xl w-full">
            <TabsList>
                <TabsTrigger value="js">NodeJS</TabsTrigger>
                <TabsTrigger value="py">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="js">
                {/* <SimpleBar></SimpleBar> */}
                <Code language="javascript" code={jsCode} showed />
            </TabsContent>
            <TabsContent value="py"></TabsContent>
        </Tabs>
    );
};

export default DocsTab;
