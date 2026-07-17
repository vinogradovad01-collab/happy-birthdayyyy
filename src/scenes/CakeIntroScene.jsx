import { useState } from "react";

import CharacterDialogue from "../components/CharacterDialogue";
import Character from "../components/Character";

import im from "../assets/images/characters/im.png";
import background from "../assets/images/background.jpg";

const cakeDialogues = [
  {
    text: "Я долго думала, какие слова мне хотелось бы сказать тебе в этот день."
  },
  {
    text: "Поэтому решила спрятать их внутри маленьких огоньков."
  },
  {
    text: "Задувай свечи по одной и читай каждое пожелание."
  },
  {
    text: "И пусть каждое из них напомнит тебе, как сильно я тебя люблю."
  }
];
function CakeIntroScene({ nextScene }) {

    const dialogues = [
        {
            text: "Я долго думала, какие слова мне хотелось бы сказать тебе в этот день."
        },
        {
            text: "Поэтому решила спрятать их внутри маленьких огоньков."
        },
        {
            text: "Задувай свечи по одной и читай каждое пожелание."
        },
        {
            text: "И пусть каждое из них напомнит тебе, как сильно я тебя люблю."
        }
    ];

    const [dialogIndex, setDialogIndex] = useState(0);
    const [started] = useState(true);
    const [finished, setFinished] = useState(false);

    function handleClick() {

        function handleClick() {

    if (!finished) return;

    if (dialogIndex < cakeDialogues.length - 1) {

        setDialogIndex(dialogIndex + 1);
        setFinished(false);

    } else {

        nextScene();

    }
}

        if (!finished) return;

        if (dialogIndex < dialogues.length - 1) {

            setDialogIndex(dialogIndex + 1);
            setFinished(false);

        } else {

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

            <Character image={im} />

            <div className="dialog-container cake-dialog-container">

    <CharacterDialogue
        text={started ? cakeDialogues[dialogIndex].text : ""}
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

export default CakeIntroScene;