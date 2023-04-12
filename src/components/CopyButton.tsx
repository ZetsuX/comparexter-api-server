"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    copyValue: string;
}

const CopyButton: FC<CopyButtonProps> = ({
    copyValue,
    className,
    ...props
}) => {
    return (
        <Button
            {...props}
            type="button"
            onClick={() => {
                navigator.clipboard.writeText(copyValue);

                toast({
                    title: "Copied successfully!",
                    message: "API Key successfully copied",
                    type: "success",
                });
            }}
            variant="ghost"
            className={className}
        >
            <Copy className="h-5 w-5" />
        </Button>
    );
};

export default CopyButton;
