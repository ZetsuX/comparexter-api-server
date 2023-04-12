"use client";

import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signOutFromGoogle = async () => {
        try {
            setIsLoading(true);
            await signOut();
        } catch (err) {
            toast({
                title: "Failed to sign out",
                message: "Please try again later",
                type: "error",
            });
        }
    };

    return (
        <Button onClick={signOutFromGoogle} isLoading={isLoading}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
