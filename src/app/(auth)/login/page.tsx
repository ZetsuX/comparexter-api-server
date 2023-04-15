import Icons from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import { btVariants } from "@/components/ui/Button";
import Heading1 from "@/components/ui/Heading1";
import Paragraph from "@/components/ui/Paragraph";
import Link from "next/link";
import React, { FC } from "react";

const page: FC = (props) => {
    return (
        <div className="absolute inset-0 mx-auto container flex flex-col items-center justify-center h-screen">
            <div className="mx-auto w-full max-w-lg flex flex-col justify-center space-y-6">
                <div className="flex flex-col items-center gap-6 text-center">
                    <Link
                        className={btVariants({
                            variant: "ghost",
                            className: "w-fit",
                        })}
                        href="/"
                    >
                        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <Heading1>Hey, welcome!</Heading1>
                    <Paragraph>
                        Sign in with your google account to continue.
                    </Paragraph>

                    <UserAuthForm />
                </div>
            </div>
        </div>
    );
};

export default page;
