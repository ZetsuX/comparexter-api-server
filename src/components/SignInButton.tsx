"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
            await signIn("google");
        } catch (err) {
            console.log(err);
            toast({
                title: "Failed to sign in",
                message: "Please try again later",
                type: "error",
            });
        }
    };

    return (
        <Button onClick={signInWithGoogle} isLoading={isLoading}>
            Sign In
        </Button>
    );
};

export default SignInButton;
