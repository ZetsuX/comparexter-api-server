"use client";

import { FC, useEffect, useState } from "react";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

interface CodeProps {
    code: string;
    showed: boolean;
    language: Language;
    animated?: boolean;
    animationDelay?: number;
}

const Code: FC<CodeProps> = ({
    code,
    showed,
    language,
    animated,
    animationDelay,
}) => {
    const { theme: applicationTheme } = useTheme();
    const [text, setText] = useState(animated ? "" : code);

    useEffect(() => {
        if (showed && animated) {
            let idx = 0;
            setTimeout(() => {
                const intervalID = setInterval(() => {
                    setText(code.slice(0, idx));
                    idx++;
                    if (idx > code.length) {
                        clearInterval(intervalID);
                    }
                }, 15);

                return () => clearInterval(intervalID);
            }, animationDelay || 150);
        }
    }, [code, showed, animated, animationDelay]);

    const lines = text.split(/\r\n|\r|\n/).length;

    const theme = applicationTheme === "light" ? lightTheme : darkTheme;

    return (
        <Highlight
            {...defaultProps}
            code={text}
            language={language}
            theme={theme}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={
                        className +
                        "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
                    }
                    style={{
                        maxHeight: showed ? lines * 24 : 0,
                        opacity: showed ? 1 : 0,
                    }}
                >
                    {tokens.map((line, i) => {
                        // eslint-disable-next-line no-unused-vars
                        const { key, ...rest } = getLineProps({ line, key: i });

                        return (
                            <div
                                key={`line-${i}`}
                                style={{ position: "relative" }}
                                {...rest}
                            >
                                {line.map((token, index) => {
                                    // eslint-disable-next-line no-unused-vars
                                    const { key, ...props } = getTokenProps({
                                        token,
                                        i,
                                    });

                                    return <span key={index} {...props}></span>;
                                })}
                            </div>
                        );
                    })}
                </pre>
            )}
        </Highlight>
    );
};

export default Code;
