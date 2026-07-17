import background from "../assets/images/background.jpg";

import { useState, useRef, useEffect } from "react";

import heartOutline from "../assets/images/heartPuzzle/heart_outline.png";
import heartFull from "../assets/images/heartPuzzle/heart_full.png";
import dialogueTop from "../assets/images/ui/dialogueTop.png";
import TypingText from "../components/TypingText";

import piece1 from "../assets/images/heartPuzzle/piece1.png";
import piece2 from "../assets/images/heartPuzzle/piece2.png";
import piece3 from "../assets/images/heartPuzzle/piece3.png";
import piece4 from "../assets/images/heartPuzzle/piece4.png";
import piece5 from "../assets/images/heartPuzzle/piece5.png";
import piece6 from "../assets/images/heartPuzzle/piece6.png";
import piece7 from "../assets/images/heartPuzzle/piece7.png";
import piece8 from "../assets/images/heartPuzzle/piece8.png";
import piece9 from "../assets/images/heartPuzzle/piece9.png";
import piece10 from "../assets/images/heartPuzzle/piece10.png";
import piece11 from "../assets/images/heartPuzzle/piece11.png";
import piece12 from "../assets/images/heartPuzzle/piece12.png";
import piece13 from "../assets/images/heartPuzzle/piece13.png";
import piece14 from "../assets/images/heartPuzzle/piece14.png";
import piece15 from "../assets/images/heartPuzzle/piece15.png";
import piece16 from "../assets/images/heartPuzzle/piece16.png";
import piece17 from "../assets/images/heartPuzzle/piece17.png";
import piece18 from "../assets/images/heartPuzzle/piece18.png";

const pieces = [

    { image: piece1,  x: 30,   y: 100, width: 120, correctX: 550, correctY: 290, locked: false },
    { image: piece2,  x: 160,  y: 100, width: 115, correctX: 738, correctY: 540, locked: false },
    { image: piece3,  x: 290,  y: 100, width: 135, correctX: 675, correctY: 406, locked: false },

    { image: piece4,  x: 30,   y: 300, width: 125, correctX: 809, correctY: 315, locked: false },
    { image: piece5,  x: 160,  y: 300, width: 125, correctX: 853, correctY: 426, locked: false },
    { image: piece6,  x: 290,  y: 300, width: 125, correctX: 609, correctY: 480, locked: false },

    { image: piece7,  x: 30,   y: 500, width: 110, correctX: 799, correctY: 487, locked: false },
    { image: piece8,  x: 160,  y: 500, width: 115, correctX: 529, correctY: 343, locked: false },
    { image: piece9,  x: 290,  y: 500, width: 120, correctX: 648, correctY: 270, locked: false },

    { image: piece10, x: 1150, y: 100, width: 125, correctX: 681, correctY: 500, locked: false },
    { image: piece11, x: 1280, y: 100, width: 127, correctX: 764, correctY: 396, locked: false },
    { image: piece12, x: 1410, y: 100, width: 143, correctX: 893, correctY: 355, locked: false },

    { image: piece13, x: 1150, y: 300, width: 118, correctX: 538, correctY: 435, locked: false },
    { image: piece14, x: 1280, y: 300, width: 140, correctX: 570, correctY: 230, locked: false },
    { image: piece15, x: 1410, y: 300, width: 152, correctX: 828, correctY: 230, locked: false },

    { image: piece16, x: 1150, y: 500, width: 160, correctX: 758, correctY: 233, locked: false },
    { image: piece17, x: 1280, y: 500, width: 140, correctX: 610, correctY: 363, locked: false },
    { image: piece18, x: 1410, y: 500, width: 145, correctX: 671, correctY: 310, locked: false }

];
const reasons = [
    "... ты всегда понимаешь мои шутки",
    "... с тобой интересно даже молчать",
    "... рядом с тобой я хочу становиться лучше",
    "... только с тобой я чувствую себя как дома",
    "... от тебя всегда вкусно пахнет",
    "... мы оба любим поесть",
    "... ты всегда на своей волне",
    "... мне с тобой никогда не скучно",
    "... ты всегда меня поддержишь в моих начинаниях",
    "... ты всегда говоришь прямо",
    "... ты не идеальна, и это делает тебя настоящей",
    "... ты всегда умеешь удивлять",
    "... ты всегда помогаешь мне с выбором",
    "... тебе интересно узнавать что-то новое вместе",
    "... там, где ты — никогда не будет грустно",
    "... ты принимаешь меня такой, какая я есть",
    "... такую, как ты, я уже не найду",
    "... из всех людей в мире ты выбрала именно меня"
];
function HeartPuzzleScene({ nextScene }) {
    const [heartPieces, setHeartPieces] = useState(pieces);

const [dialogText, setDialogText] = useState("Я люблю тебя потому что...");
const [heartCompleted, setHeartCompleted] = useState(false);
const [lastTextFinished, setLastTextFinished] = useState(false);

const draggedPiece = useRef(null);
const offset = useRef({ x: 0, y: 0 });
const reasonIndexRef = useRef(0);
       function logPositions() {
        console.log(
            heartPieces.map(piece => ({
                x: Math.round(piece.x),
                y: Math.round(piece.y)
            }))
        );
    }

    function startDrag(e, index) {

    if (heartPieces[index].locked) return;
    draggedPiece.current = index;

    e.currentTarget.setPointerCapture(e.pointerId);

    offset.current = {
        x: e.clientX - heartPieces[index].x,
        y: e.clientY - heartPieces[index].y
    };

}
useEffect(() => {

    function move(e) {

        if (draggedPiece.current === null) return;

        setHeartPieces(prev =>
            prev.map((piece, index) => {

                if (index !== draggedPiece.current || piece.locked) return piece;
                return {
                    ...piece,
                    x: e.clientX - offset.current.x,
                    y: e.clientY - offset.current.y
                };

            })
        );

    }

function stop() {

    if (draggedPiece.current !== null) {

        const index = draggedPiece.current;

        setHeartPieces(prev => {

            const updated = [...prev];

            const piece = updated[index];
            if (piece.locked) return updated;

            const dx = piece.x - piece.correctX;
            const dy = piece.y - piece.correctY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 40) {

                updated[index] = {
                    ...piece,
                    x: piece.correctX,
                    y: piece.correctY,
                    locked: true
                };
                const allPlaced = updated.every(p => p.locked);

if (allPlaced) {

    setHeartCompleted(true);

    setDialogText(
        "...из всех людей в мире ты выбрала именно меня"
    );

}
const currentReason = reasons[reasonIndexRef.current];

setDialogText(currentReason);

reasonIndexRef.current++;

if (!allPlaced) {

    setTimeout(() => {
        setDialogText("Я люблю тебя потому что...");
    }, 3000);

}

            }

            return updated;

        });

    }

    draggedPiece.current = null;
}

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);

    return () => {

        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", stop);

    };

}, []);

    return (

        <div
    className="heart-puzzle-screen"
    onClick={() => {

        if (lastTextFinished) {

            nextScene();

        }

    }}
>

            <img
                src={background}
                className="background"
                alt=""
            />

            {!heartCompleted && (
    <img
        src={heartOutline}
        className="heart-outline"
        alt=""
    />
)}
{heartCompleted && (

    <img
    src={heartFull}
    className="heart-full"
    alt=""
/>

)}
        

    <img
        src={dialogueTop}
        className="heart-dialog-bg"
        alt=""
    />

   <div className="heart-dialog-text">

<TypingText
    key={dialogText}
    text={dialogText}
    speed={heartCompleted ? 70 : 35}
    color={heartCompleted ? "#b0173b" : "#3c0d22"}
    onComplete={() => {

        if (heartCompleted) {

            setLastTextFinished(true);

        }

    }}
/>
{lastTextFinished && (

    <div className="intro-arrow">

        ▶

    </div>

)}

</div>
{!heartCompleted &&
    heartPieces.map((piece, index) =>(

    <img

        key={index}
        src={piece.image}
        onPointerDown={(e) => startDrag(e, index)}

        className="heart-piece"

        style={{
    left: piece.x,
    top: piece.y,
    width: piece.width
}}

        alt=""

    />

))}

        </div>

    );

}

export default HeartPuzzleScene;