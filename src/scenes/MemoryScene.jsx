import { useState, useEffect, useRef } from "react";

import Character from "../components/Character";
import CharacterDialogue from "../components/CharacterDialogue";

import background from "../assets/images/background.jpg";
import imh from "../assets/images/characters/Imh.png";

// <-- сюда потом поставим свою озвучку
import memoryVoice from "../assets/audio/memory.mp3";

function MemoryScene({ nextScene }) {

    const text =
        "Сегодня мы вспомним самые счастливые моменты и создадим новые!! ";

    const [finished, setFinished] = useState(false);

    const audio = useRef(new Audio(memoryVoice));

    useEffect(() => {

        audio.current.play().catch(() => {});

        audio.current.onended = () => {
            setFinished(true);
        };

        return () => {

            audio.current.pause();
            audio.current.currentTime = 0;

        };

    }, []);

    function handleClick() {

        if (finished) {
            nextScene();
        }

    }

    return (

        <div
            className="game-screen"
            onClick={handleClick}
        >

            <img
                src={background}
                className="background"
                alt=""
            />

            <Character
                image={imh}
                className="character-breath"
            />

            <div className="dialog-container">

                <CharacterDialogue
                    text={text}
                    fontSize={18.9}
                />

            </div>

            {finished && (

                <div className="intro-arrow">
                    ▶
                </div>

            )}

        </div>

    );

}

export default MemoryScene;