import Heading1 from "@/components/ui/Heading1";
import Paragraph from "@/components/ui/Paragraph";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "API Server | Home",
    description: "Open-source API usable by everyone",
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
                        Feel free to use our <br /> API for your needs
                    </Heading1>

                    <Paragraph className="max-w-xl lg:text-left">
                        With our API, you can do whatever this API can do and
                        utilize it's features for your needs with a free{" "}
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
                            className="img-shadow"
                            quality={100}
                            style={{ objectFit: "contain" }}
                            fill
                            src="/homeimage.png"
                            alt="Home Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
