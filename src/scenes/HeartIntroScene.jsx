import { useRef, useState } from "react";

import background from "../assets/images/background.jpg";
import im from "../assets/images/characters/im.png";

import hearts2 from "../assets/images/ui/hearts2.png";
import dialogueTop from "../assets/images/ui/dialogueTop.png";

import Dialogue from "../components/Dialogue";

function HeartIntroScene({ nextScene }) {

    const dialogueRef = useRef();

    const [finished, setFinished] = useState(false);

    return (

        <div
            className="gifts-screen"
            onClick={(e) => {

    e.stopPropagation();

    dialogueRef.current?.next();

}}
        >

            <img
                src={background}
                className="background"
                alt=""
            />

            <img
                src={hearts2}
                className="gifts-hearts"
                alt=""
            />

            <img
                src={im}
                className="gifts-character"
                alt=""
            />

            <div className="gifts-dialog">

                <img
                    src={dialogueTop}
                    className="gifts-dialog-bg"
                    alt=""
                />

                <Dialogue

                    ref={dialogueRef}

                    messages={[

                        "Говорят, сердце можно собрать по кусочкам...",

                        "Моё тоже когда-то было разбито...",

                        "Но каждый его кусочек напоминает мне об одной причине, почему я люблю тебя.",

                        "Попробуй собрать его. И, возможно, к концу этой игры ты узнаешь моё сердце немного лучше"

                    ]}

                    onTypingComplete={setFinished}

                    onFinish={nextScene}

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

export default HeartIntroScene;