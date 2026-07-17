import background from "../assets/images/background.jpg";

import usk from "../assets/images/characters/usk.png";
import hearts from "../assets/images/ui/hearts.png";
import buttonStart from "../assets/images/ui/button_start.png";

function StartScene({ onStart }) {

    return (

        <div className="start-screen">

            <img
                src={background}
                className="background"
                alt=""
            />

            <img
                src={hearts}
                className="start-hearts"
                alt=""
            />

            <img
                src={usk}
                className="start-character"
                alt=""
            />

            <div className="start-right">

                <div className="start-title">
                    С ДНЕМ РOЖДЕНИЯ,
                    <br />
                    МOЯ ЛЮБИМOСТЬ!
                </div>

                <img
                    src={buttonStart}
                    className="start-button"
                    alt="Старт"
                    onClick={onStart}
                />

            </div>

        </div>

    );

}

export default StartScene;