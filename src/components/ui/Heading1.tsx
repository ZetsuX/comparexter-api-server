import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const h1Variants = cva(
    "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
    {
        variants: {
            size: {
                default: "text-4xl md:text-5xl lg:text-6xl",
                sm: "text-2xl md:text-3xl lg:text-4xl",
                lg: "text-5xl md:text-6xl lg:text-7xl",
            },
        },

        defaultVariants: {
            size: "default",
        },
    }
);

interface Heading1Props
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof h1Variants> {}

const Heading1 = forwardRef<HTMLHeadingElement, Heading1Props>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <h1 ref={ref} {...props} className={cn(h1Variants({ size, className }))}>
                {children}
            </h1>
        );
    }
);

Heading1.displayName = "Heading1";

export default Heading1;
