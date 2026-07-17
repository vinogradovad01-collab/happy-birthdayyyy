import { useState } from "react";

import background from "../assets/images/background.jpg";

import ush from "../assets/images/characters/ush.png";

import hearts2 from "../assets/images/ui/hearts2.png";
import dialogueTop from "../assets/images/ui/dialogueTop.png";
import gift from "../assets/images/ui/gift.png";

function GiftsScene({
    nextScene,
    nextHeartScene,
    nextCakeScene,
    openedGifts
}) {

    const [selected, setSelected] = useState(null);

    function chooseGift(index) {

    if (openedGifts.includes(index)) return;

    setSelected(index);

    setTimeout(() => {

        if (index === 0) {

            nextScene();

        }

        else if (index === 1) {

            nextHeartScene();

        }

        else if (index === 2) {

            nextCakeScene();

        }

    }, 600);

}

    return (

        <div className="gifts-screen">

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
                src={ush}
                className="gifts-character"
                alt=""
            />

            <div className="gifts-dialog">

                <img
                    src={dialogueTop}
                    className="gifts-dialog-bg"
                    alt=""
                />

                <div className="gifts-dialog-text">
                    Время выбирать подарок
                </div>

            </div>

            <div className="gifts-container">

                {[0,1,2].map((giftIndex)=>(

                    <img
                        key={giftIndex}
                        src={gift}
                        alt=""
                        className={`gift
    ${selected === giftIndex ? "gift-selected" : ""}
    ${selected !== null && selected !== giftIndex ? "gift-fade" : ""}
    ${openedGifts.includes(giftIndex) ? "gift-opened" : ""}
`}
                        onClick={() => chooseGift(giftIndex)}
                    />

                ))}

            </div>

        </div>

    );

}

export default GiftsScene;