import Heading1 from "@/components/ui/Heading1";
import Paragraph from "@/components/ui/Paragraph";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Comparexter API | Home",
    description: "Open-source Text Comparison API for everyone",
    icons: {
        icon: "/favicon.png",
    },
};

export default function Home() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
            <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
                <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
                    <Heading1
                        size="lg"
                        className="three-d text-black dark:text-light-primary"
                    >
                        Compare with ease,
                        <br /> see all differences
                    </Heading1>

                    <Paragraph className="max-w-xl lg:text-left">
                        Using Comparexter API, you are able to detect the
                        differences that matter between two texts by using a
                        free{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-2 text-black dark:text-light-primary"
                        >
                            API Key
                        </Link>
                        .
                    </Paragraph>

                    <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
                        <Image
                            priority
                            className="img-shadow scale-90"
                            quality={100}
                            style={{ objectFit: "contain" }}
                            fill
                            src="/hmeimage.png"
                            alt="Home Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
