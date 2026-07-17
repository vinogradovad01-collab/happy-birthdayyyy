import { useState } from "react";

import CharacterDialogue from "../components/CharacterDialogue";
import Character from "../components/Character";

import im from "../assets/images/characters/im.png";
import background from "../assets/images/background.jpg";

const endingDialogues = [
    {
        text: "Ты открыла все подарки, но..."
    },
    {
        text: "Кажется… осталось еще кое-что."
    }
];

function EndingIntroScene({ nextScene }) {

    const [dialogIndex, setDialogIndex] = useState(0);
    const [started] = useState(true);
    const [finished, setFinished] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    function handleClick() {

        if (!finished) return;

        if (dialogIndex < endingDialogues.length - 1) {

            setDialogIndex(dialogIndex + 1);
            setFinished(false);

        } else {

            setFadeOut(true);

            setTimeout(() => {

                nextScene();

            }, 1200);

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

            <Character image={im} />

            <div className="dialog-container">

                <CharacterDialogue
                    text={started ? endingDialogues[dialogIndex].text : ""}
                    onComplete={() => setFinished(true)}
                />

            </div>

            {started && finished && !fadeOut && (

                <div className="intro-arrow">
                    ▶
                </div>

            )}

            <div className={`ending-fade ${fadeOut ? "active" : ""}`}></div>

        </div>

    );

}

export default EndingIntroScene;