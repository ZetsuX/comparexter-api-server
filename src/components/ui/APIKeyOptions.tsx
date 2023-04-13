"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";
import Icons from "@/components/Icons";
import { toast } from "@/ui/Toast";
import { useRouter } from "next/navigation";
import { createAPIKey } from "@/utils/create-api-key";
import { revokeAPIKey } from "@/utils/revoke-api-key";

interface APIKeyOptionsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    apiKeyID: string;
    apiKeyText: string;
}

const APIKeyOptions: FC<APIKeyOptionsProps> = ({
    apiKeyID,
    apiKeyText,
    className,
}) => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
    const [isRevoking, setIsRevoking] = useState<boolean>(false);
    const router = useRouter();

    const createNewKey = async () => {
        setIsCreatingNew(true);

        try {
            await revokeAPIKey({ keyId: apiKeyID });
            await createAPIKey();
            router.refresh();
        } catch (err) {
            toast({
                title: "Error creating API Key",
                message: "Please try again later..",
                type: "error",
            });
        }

        setIsCreatingNew(false);
    };

    const revokeCurrentKey = async () => {
        setIsRevoking(true);

        try {
            await revokeAPIKey({ keyId: apiKeyID });
            router.refresh();
        } catch (err) {
            toast({
                title: "Error revoking API Key",
                message: "Please try again later..",
                type: "error",
            });
        }

        setIsRevoking(false);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
                <Button variant="ghost" className={className}>
                    <p>
                        {isCreatingNew ? (
                            ""
                        ) : isRevoking ? (
                            ""
                        ) : (
                            <Icons.MoreHorizontal />
                        )}
                    </p>

                    {isCreatingNew || isRevoking ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                    ) : null}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => {
                        navigator.clipboard.writeText(apiKeyText);

                        toast({
                            title: "Copied successfully!",
                            message: "API Key successfully copied",
                            type: "success",
                        });
                    }}
                >
                    Copy
                </DropdownMenuItem>

                <DropdownMenuItem onClick={createNewKey}>
                    Create new
                </DropdownMenuItem>

                <DropdownMenuItem onClick={revokeCurrentKey}>
                    Revoke current
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default APIKeyOptions;
