import { useState, useEffect, useRef } from "react";
import typeSound from "../assets/audio/type.mp3";

function TypingText({
    text,
    speed = 40,
    color = "#d94f91",
    onComplete,
}) {

    const [displayedText, setDisplayedText] = useState("");

    const audio = useRef(new Audio(typeSound));

    const onCompleteRef = useRef(onComplete);

    useEffect(() => {

        onCompleteRef.current = onComplete;

    }, [onComplete]);

    useEffect(() => {

        setDisplayedText("");

        let index = 0;

        const interval = setInterval(() => {

            index++;

            setDisplayedText(text.slice(0, index));

            if (index % 2 === 0) {

                audio.current.currentTime = 0;
                audio.current.play().catch(() => {});

            }

            if (index >= text.length) {

                clearInterval(interval);

                audio.current.pause();
                audio.current.currentTime = 0;

                onCompleteRef.current?.();

            }

        }, speed);

        return () => {

            clearInterval(interval);

            audio.current.pause();
            audio.current.currentTime = 0;

        };

    }, [text, speed]);

   return (

    <span
        style={{
            color,
            display: "block",
            width: "100%",
            textAlign: "center"
        }}
    >

        {displayedText}

    </span>

);

}

export default TypingText;