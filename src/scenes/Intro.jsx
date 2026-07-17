import { useState } from "react";

import CharacterDialogue from "../components/CharacterDialogue";
import Character from "../components/Character";

import { introDialogues } from "../data/dialogues";

import im from "../assets/images/characters/im.png";
import imWave from "../assets/images/characters/imWave.png";
import background from "../assets/images/background.jpg";

function Intro({ nextScene }) {

    const [dialogIndex, setDialogIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    function handleClick() {

        // Первый клик запускает диалог
        if (!started) {
            setStarted(true);
            return;
        }

        // Пока текст печатается
        if (!finished) return;

        // Следующая реплика
        if (dialogIndex < introDialogues.length - 1) {

            setDialogIndex(dialogIndex + 1);
            setFinished(false);

        } else {

    console.log("Переход на пароль");
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
                image={dialogIndex === 0 ? imWave : im}
            />

            <div className="dialog-container">

                <CharacterDialogue
                    text={started ? introDialogues[dialogIndex].text : ""}
                    onComplete={() => setFinished(true)}
                />

            </div>

            {started && finished && (

                <div className="intro-arrow">
    ▶
</div>

            )}

        </div>

    );

}

export default Intro;