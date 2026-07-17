import { useState } from "react";
import TypingText from "../components/TypingText";

import { useEffect, useRef } from "react";
import introMusic from "../assets/audio/intro.mp3";

import background from "../assets/images/background.jpg";
import usr from "../assets/images/characters/usr.png";
import dialogueTop from "../assets/images/ui/dialogueTop.png";
import passwordImage from "../assets/images/ui/password.png";

function Password({ nextScene }) {

    const [code, setCode] = useState([]);
    const [dialogColor, setDialogColor] = useState("#d94f91");
    const [dialogText, setDialogText] = useState(
        "Чтобы начать приключение, введи секретный пароль!"
    );

    const [correct, setCorrect] = useState(false);

    const correctPassword = "1907";

    function press(value) {

        if (correct) return;

        if (value === "#") {
            setCode((prev) => prev.slice(0, -1));
            return;
        }

        if (value === "*") {
            setCode([]);
            return;
        }

        if (code.length >= 4) return;

        const newCode = [...code, value];
        setCode(newCode);

        if (newCode.length === 4) {

            if (newCode.join("") === correctPassword) {

                setCorrect(true);

                setDialogColor("#ff3b6b");
                setDialogText("Ты отгадала пароль!!!!");

            } else {

                setDialogColor("#88144c");
                setDialogText("Хммммм... Кажется это не тот пароль");

                setTimeout(() => {

                    setCode([]);

                    setDialogColor("#d94f91");
                    setDialogText(
                        "Чтобы начать приключение, введи секретный пароль!"
                    );

                }, 2500);

            }

        }

    }

    function handleClick() {

        if (correct) {
            nextScene();
        }

    }

    const keys = [

        { value: "1", left: 112, top: 155 },
        { value: "2", left: 183, top: 155 },
        { value: "3", left: 254, top: 155 },

        { value: "4", left: 112, top: 224 },
        { value: "5", left: 183, top: 224 },
        { value: "6", left: 254, top: 224 },

        { value: "7", left: 120, top: 280 },
        { value: "8", left: 185, top: 280 },
        { value: "9", left: 254, top: 280 },

        { value: "*", left: 114, top: 340 },
        { value: "0", left: 185, top: 340 },
        { value: "#", left: 256, top: 340 },

    ];

    return (

        <div
            className="password-screen"
            onClick={handleClick}
        >

            <img
                src={background}
                className="background"
                alt=""
            />

            <img
                src={usr}
                className="password-character"
                alt=""
            />

            <div className="password-dialog">

                <img
                    src={dialogueTop}
                    className="password-dialog-bg"
                    alt=""
                />

                <div
                    className="password-dialog-text"
                    style={{ color: dialogColor }}
                >
                    <TypingText
                        text={dialogText}
                        color={dialogColor}
                    />
                </div>

            </div>

            {correct && (

                <div className="continue-arrow">
                    ▶
                </div>

            )}

            <div className="password-pad">

                <div className="password-display">

                    <div>{code[0] || ""}</div>
                    <div>{code[1] || ""}</div>
                    <div>{code[2] || ""}</div>
                    <div>{code[3] || ""}</div>

                </div>

                <img
                    src={passwordImage}
                    className="password-image"
                    alt=""
                />

                {keys.map((key) => (

                    <button
                        key={key.value}
                        className="key"
                        style={{
                            left: key.left,
                            top: key.top,
                            width: 50,
                            height: 50,
                        }}
                        onClick={(e) => {

                            e.stopPropagation();
                            press(key.value);

                        }}
                    />

                ))}

            </div>

        </div>

    );

}

export default Password;