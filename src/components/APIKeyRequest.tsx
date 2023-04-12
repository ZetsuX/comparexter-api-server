"use client";

import React, { FC, FormEvent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createAPIKey } from "@/utils/create-api-key";
import Heading1 from "@/ui/Heading1";
import { Key } from "lucide-react";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";
import Button from "@/ui/Button";

const APIKeyRequest: FC = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string | null>(null);

    const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsCreating(true);

        try {
            const createdApiKey = await createAPIKey();
            setApiKey(createdApiKey);
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    title: "Error",
                    message: err.message,
                    type: "error",
                });
                return;
            }

            toast({
                title: "Error",
                message: "Something went wrong",
                type: "error",
            });
        }

        setIsCreating(false);
    };

    return (
        <div className="container md:max-w-2xl">
            <div className="flex flex-col gap-6 items-center">
                <Key className="mx-auto h-12 w-12 text-gray-400" />
                <Heading1>Request an API Key</Heading1>
                <Paragraph>
                    You haven&apos;t requested any API Key yet..
                </Paragraph>

                <form
                    onSubmit={createNewApiKey}
                    className="mt-6 sm:flex sm:items-center"
                    action="#"
                >
                    <div className="relative rounded-md shadow-dn sm:min-w-0 sm:flex-1">
                        {apiKey ? (
                            <CopyButton
                                copyValue={apiKey}
                                className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
                            />
                        ) : null}
                        <Input
                            readOnly
                            value={apiKey ?? ""}
                            placeholder="Request an API Key!"
                        />
                    </div>

                    <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                        <Button disabled={!!apiKey} isLoading={isCreating}>
                            Request Key
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default APIKeyRequest;
