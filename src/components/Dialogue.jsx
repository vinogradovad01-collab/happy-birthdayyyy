import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";

import typeSound from "../assets/audio/type.mp3";

const Dialogue = forwardRef(function Dialogue(

    {
        messages,
        onFinish,
        onTypingComplete,
        speed = 35,
        color = "#702449"
    },

    ref

) {

    const [messageIndex, setMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [finished, setFinished] = useState(false);

    const audio = useRef(new Audio(typeSound));

    useEffect(() => {

        setDisplayedText("");
        setFinished(false);
        onTypingComplete?.(false);

        let index = 0;

        const interval = setInterval(() => {

            index++;

            setDisplayedText(
                messages[messageIndex].slice(0, index)
            );

            if (index % 2 === 0) {

                audio.current.currentTime = 0;
                audio.current.play().catch(() => {});

            }

            if (index >= messages[messageIndex].length) {

                clearInterval(interval);

                audio.current.pause();
                audio.current.currentTime = 0;

                setFinished(true);
                onTypingComplete?.(true);

            }

        }, speed);

        return () => {

            clearInterval(interval);

            audio.current.pause();
            audio.current.currentTime = 0;

        };

    }, [messageIndex]);

    function next() {

        if (!finished) return;

        setFinished(false);
        onTypingComplete?.(false);

        if (messageIndex < messages.length - 1) {

            setMessageIndex(prev => prev + 1);

        } else {

            onFinish?.();

        }

    }

    useImperativeHandle(ref, () => ({

        next

    }));

    return (

        <div className="gifts-dialog-text">

            <span style={{ color }}>

                {displayedText}

            </span>

        </div>

    );

});

export default Dialogue;