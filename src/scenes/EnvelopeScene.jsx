import { useState } from "react";

import background from "../assets/images/background.jpg";

import envelope from "../assets/images/ui/envelope.png";
import envelopeOpen from "../assets/images/ui/envelope_open.png";
import letter from "../assets/images/ui/letter.png";

import TypingText from "../components/TypingText";

function EnvelopeScene() {

    const letterText = `Эта игра это мой единственный способ сказать тебе как сильно я тебя люблю и дорожу тобой, на своем языке. Именно в моменты когда я создаю что то на подобии того во что ты сейчас тыкалась или тех цветов из ленты, или любой другой открытки и штуки которые я тебе подарила, я понимаю насколько ты мне не безразлична. Я потратила на создание этой совсем небольшой игры 10 суток (по 15 часов в день пздц) и считай породнилась с чатом гпт пока он воплощал все мои ебанутые идеи в жизнь). Много где пока я писала тебе, на протяжении всей мини-игры, текст я плакала, но не от грусти, в от радости того, что однажды ты все таки вошла в мою грешную жизнь;). Не знаю, хорошо ли что мы встретились именно тогда, не позже, не раньше, а именно 20.09.24 (я запомнила, правда). Я верю в судьбу и благодарна ей что она подарила мне такую замечательную девочку как ты. O большем я наверное и не могла мечтать. Еще раз хочу тебе напомнить что я очень сильно тебя люблю и надеюсь что эта игрушка тебе понравилась. Happy birthday, my love!!!`;

    // 0 - закрытый конверт
    // 1 - открытый
    // 2 - маленькое письмо
    // 3 - большое письмо

    const [step, setStep] = useState(0);

    const [bounce, setBounce] = useState(false);

    const [dark, setDark] = useState(false);

    const [showText, setShowText] = useState(false);

    const [finished, setFinished] = useState(false);
    const [endFade, setEndFade] = useState(false);
const [showEnd, setShowEnd] = useState(false);

    function handleClick() {

        if (step === 0) {

            setBounce(true);

            setTimeout(() => {

                setBounce(false);
                setStep(1);

            }, 220);

        }

        else if (step === 1) {

            setBounce(true);

            setTimeout(() => {

                setBounce(false);
                setStep(2);

            }, 220);

        }

        else if (step === 2) {

            setBounce(true);

            setTimeout(() => {

                setBounce(false);

                setDark(true);

            }, 220);

            setTimeout(() => {

                setStep(3);

            }, 1000);

            setTimeout(() => {

                setDark(false);
                setShowText(true);

            }, 1200);

        }

        else if (step === 3 && finished) {

    setEndFade(true);

    setTimeout(() => {

        setShowEnd(true);

    }, 1200);

}

    }

    return (

        <div
            className="envelope-screen"
            onClick={handleClick}
        >

            <img
                src={background}
                className="background"
                alt=""
            />

            {step === 0 && (

                <img
                    src={envelope}
                    className={`envelope ${bounce ? "bounce" : ""}`}
                    alt=""
                />

            )}

            {step === 1 && (

                <img
                    src={envelopeOpen}
                    className={`envelope ${bounce ? "bounce" : ""}`}
                    alt=""
                />

            )}

            {step === 2 && (

                <img
                    src={letter}
                    className={`small-letter ${bounce ? "bounce" : ""}`}
                    alt=""
                />

            )}

            {step === 3 && (

                <img
                    src={letter}
                    className="big-letter"
                    alt=""
                />

            )}

            {showText && (

                <div className="letter-text">

                    <TypingText

                        text={letterText}

                        speed={40}

                        color="#3c0d22"

                        onComplete={() => setFinished(true)}

                    />

                </div>

            )}

            {finished && (

                <div className="intro-arrow">

                    ▶

                </div>

            )}

            <div className={`dark-overlay ${dark ? "active" : ""}`}></div>
             
             <div className={`dark-overlay ${endFade ? "active" : ""}`}></div>

{showEnd && (

    <div className="end-screen">

        <h1>На этом всё </h1>

        <p>Киниц.</p>

    </div>

)}
        </div>

    );

}

export default EnvelopeScene;