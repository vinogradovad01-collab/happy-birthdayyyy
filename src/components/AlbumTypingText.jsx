import { useEffect, useRef, useState } from "react";

function AlbumTypingText({
    text,
    speed = 40,
    color = "#5d3a22",
    onComplete,
}) {

    const [displayedText, setDisplayedText] = useState("");
    const finishedRef = useRef(false);

    useEffect(() => {

        finishedRef.current = false;
        setDisplayedText("");

        let index = 0;

        const interval = setInterval(() => {

            index++;

            setDisplayedText(text.slice(0, index));

            if (index >= text.length) {

                clearInterval(interval);

                if (!finishedRef.current) {

                    finishedRef.current = true;

                    onComplete?.();

                }

            }

        }, speed);

        return () => clearInterval(interval);

    }, [text]);

    return (
        <span style={{ color }}>
            {displayedText}
        </span>
    );

}

export default AlbumTypingText;