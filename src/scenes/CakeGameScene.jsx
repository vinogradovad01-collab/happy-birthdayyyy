import { useState, useRef } from "react";

import background from "../assets/images/background.jpg";
import cake from "../assets/images/ui/cake.png";
import candleOn from "../assets/images/ui/candleOn.png";
import candleOff from "../assets/images/ui/candleOff.png";

import dialogueTop from "../assets/images/ui/dialogueTop.png";
import TypingText from "../components/TypingText";

const wishes = [
    "Желаю, чтобы твоя улыбка никогда не исчезала.",
    "Желаю всегда оставаться такой же доброй и искренней.",
    "Желаю, чтобы рядом были только любящие люди.",
    "Желаю, чтобы ты всегда верила в себя.",
    "Желаю, чтобы каждый день приносил тебе радость.",
    "Желаю всегда чувствовать себя любимой.",
    "Желаю, чтобы удача всегда была на твоей стороне.",
    "Желаю, чтобы все твои старания приносили желаемый результат.",
    "Желаю, чтобы удача сопровождала тебя во всем.",
    "Желаю никогда не терять свою искренность.",
    "Желаю, чтобы каждый новый день был лучше предыдущего.",
    "Желаю никогда не переставать мечтать.",
    "Желаю, чтобы впереди тебя ждали только приятные сюрпризы.",
    "Желаю, чтобы этот год подарил тебе множество счастливых воспоминаний.",
    "Желаю, чтобы даже трудные дни заканчивались надеждой.",
    "Желаю, чтобы ты никогда не забывала, какая ты замечательная.",
    "Желаю, чтобы ты никогда не сомневалась в том, как сильно я тебя люблю."
];

export default function CakeGameScene({ nextScene }) {

    const [dialogText, setDialogText] = useState("Нажимай на свечи ✨");

    const [candles, setCandles] = useState(
        Array.from({ length: 18 }, () => ({
            lit: true,
            bounce: false
        }))
    );
    const [lightsOff, setLightsOff] = useState(false);
const [endingStep, setEndingStep] = useState(0);

const endingTexts = [
    "Я очень благодарна твоим родителям за то, что 18 лет назад появилась именно ты.",
    "Потому что однажды это изменило и мою жизнь."
];
    const wishIndex = useRef(0);
    const [endingFinished, setEndingFinished] = useState(false);

    const candlePositions = [
        {x:540,y:245},
        {x:585,y:200},
        {x:630,y:170},
        {x:675,y:205},
        {x:720,y:190},
        {x:765,y:160},
        {x:810,y:190},
        {x:855,y:235},
        {x:900,y:255},

        {x:560,y:305},
        {x:625,y:250},
        {x:620,y:330},
        {x:705,y:300},
        {x:760,y:260},
        {x:810,y:280},
        {x:860,y:330},

        {x:680,y:360},
        {x:780,y:360}
    ];

    function blowCandle(index){

    if(!candles[index].lit) return;

    setCandles(prev=>{

        const copy=[...prev];

        copy[index]={
            lit:false,
            bounce:true
        };

        return copy;

    });

    setTimeout(()=>{

        setCandles(prev=>{

            const copy=[...prev];

            copy[index]={
                ...copy[index],
                bounce:false
            };

            return copy;

        });

    },250);

// После 17 пожеланий начинается финал
if(wishIndex.current === wishes.length){

    setTimeout(() => {

        setLightsOff(true);

    },300);

    setTimeout(() => {

        setEndingStep(1);

    },2300);

}

    setDialogText(wishes[wishIndex.current]);

    wishIndex.current++;

}
function handleEndingClick() {

    if (!endingFinished) return;

    if (endingStep === 1) {

        setEndingStep(2);
        setEndingFinished(false);

    }

    else if (endingStep === 2) {

        // здесь потом будет переход
        nextScene();

    }

}

    return(
        

        <div
    className="cake-screen"
    onClick={() => {

        if (lightsOff) {

            handleEndingClick();

        }

    }}
>

            <img src={background} className="background"/>

            <img src={cake} className="cake"/>

            {!lightsOff && (
<>
    <img
        src={dialogueTop}
        className="cake-dialog-bg"
    />

    <div className="cake-dialog-text">

        <TypingText
            key={dialogText}
            text={dialogText}
            speed={35}
            color="#3c0d22"
        />

    </div>
</>
)}

            {candles.map((candle,index)=>(

                <img

                    key={index}

                    src={candle.lit?candleOn:candleOff}

                    className={`cake-candle ${candle.bounce?"candle-bounce":""}`}

                    style={{
                        left:candlePositions[index].x + 30,
                        top:candlePositions[index].y -40
                    }}

                    onClick={()=>blowCandle(index)}

                    alt=""

                />

            ))}

            <div className={`dark-overlay ${lightsOff ? "active" : ""}`}></div>

{lightsOff && endingStep > 0 && (

<div className="ending-dialog">

    <TypingText
        key={endingStep}
        text={endingTexts[endingStep-1]}
        speed={80}
        color="#c81f52"
        onComplete={() => setEndingFinished(true)}
    />

</div>

)}

        </div>

    );

}