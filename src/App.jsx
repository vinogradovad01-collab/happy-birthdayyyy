import { useState, useRef, useEffect } from "react";

import introMusic from "./assets/audio/intro.mp3";
import mainMusic from "./assets/audio/main.mp3";
import albumMusic from "./assets/audio/album.mp3";
import heartMusic from "./assets/audio/heart.mp3";
import cakeMusic from "./assets/audio/cake.mp3";
import endingMusic from "./assets/audio/ending.mp3";

import GiftsScene from "./scenes/GiftsScene";
import Intro from "./scenes/Intro";
import Password from "./scenes/Password";
import StartScene from "./scenes/StartScene";
import MemoryScene from "./scenes/MemoryScene";
import AlbumScene from "./scenes/AlbumScene";
import HeartIntroScene from "./scenes/HeartIntroScene";
import HeartPuzzleScene from "./scenes/HeartPuzzleScene";
import CakeIntroScene from "./scenes/CakeIntroScene";
import CakeGameScene from "./scenes/CakeGameScene";
import EndingIntroScene from "./scenes/EndingIntroScene";
import PhotoScene from "./scenes/PhotoScene";
import EnvelopeScene from "./scenes/EnvelopeScene";

function App() {

    const [scene, setScene] = useState("intro");
    const music = useRef(new Audio(introMusic));
    const main = useRef(new Audio(mainMusic));
    const album = useRef(new Audio(albumMusic));
    const heart = useRef(new Audio(heartMusic));
    const cake = useRef(new Audio(cakeMusic));
    const ending = useRef(new Audio(endingMusic));
    const [openedGifts, setOpenedGifts] = useState([]);
    const [fade, setFade] = useState(false);

    useEffect(() => {

    music.current.loop = true;
    music.current.volume = 0.35;

    main.current.loop = true;
    main.current.volume = 0.6;

    album.current.loop = true;
    album.current.volume = 0.35;

    heart.current.loop = true;
    heart.current.volume = 0.35;

    cake.current.loop = true;
cake.current.volume = 0.35;

ending.current.loop = true;
ending.current.volume = 0.9;

    // Интро + пароль
    if (scene === "intro" || scene === "password") {

        main.current.pause();
        main.current.currentTime = 0;

        music.current.play().catch(() => {});

    }

    // Основная часть игры
    else if (

    scene === "start" ||
    scene === "memory" ||
    scene === "gifts" 

) {

    music.current.pause();
    music.current.currentTime = 0;

    // <-- ЭТОГО, скорее всего, не хватает
    album.current.pause();
    album.current.currentTime = 0;

    main.current.play().catch(() => {});

    heart.current.pause();
heart.current.currentTime = 0;

cake.current.pause();
cake.current.currentTime = 0;

ending.current.pause();
ending.current.currentTime = 0;

}
else if (
    scene === "heartIntro" ||
    scene === "heartPuzzle"
) {

    music.current.pause();
    music.current.currentTime = 0;

    main.current.pause();
    main.current.currentTime = 0;

    album.current.pause();
    album.current.currentTime = 0;

    cake.current.pause();
cake.current.currentTime = 0;

ending.current.pause();
ending.current.currentTime = 0;

    heart.current.play().catch(() => {});

}
else if (

    scene === "cakeIntro" ||
    scene === "cakeGame"

) {

    music.current.pause();
    music.current.currentTime = 0;

    main.current.pause();
    main.current.currentTime = 0;

    album.current.pause();
    album.current.currentTime = 0;

    heart.current.pause();
    heart.current.currentTime = 0;

    ending.current.pause();
ending.current.currentTime = 0;

    cake.current.play().catch(() => {});

}
    else if (scene === "album") {

    music.current.pause();
    music.current.currentTime = 0;

    main.current.pause();
    main.current.currentTime = 0;

    heart.current.pause();
    heart.current.currentTime = 0;

    cake.current.pause();
cake.current.currentTime = 0;

ending.current.pause();
ending.current.currentTime = 0;

    album.current.play().catch(() => {});

}
else if (

    scene === "endingIntro" ||
    scene === "photo" ||
    scene === "envelope"

) {

    music.current.pause();
    music.current.currentTime = 0;

    main.current.pause();
    main.current.currentTime = 0;

    album.current.pause();
    album.current.currentTime = 0;

    heart.current.pause();
    heart.current.currentTime = 0;

    cake.current.pause();
    cake.current.currentTime = 0;

    ending.current.play().catch(() => {});

}

    // Финал
    else {

        music.current.pause();
        music.current.currentTime = 0;

        main.current.pause();
        main.current.currentTime = 0;

        album.current.pause();
        album.current.currentTime = 0;

        heart.current.pause();
    heart.current.currentTime = 0;

    cake.current.pause();
cake.current.currentTime = 0;

ending.current.pause();
ending.current.currentTime = 0;

    }

}, [scene]);

    function changeScene(nextScene) {

        setFade(true);

        setTimeout(() => {

            setScene(nextScene);

        }, 500);

        setTimeout(() => {

            setFade(false);

        }, 1000);

    }

    function finishMiniGame(giftId) {

        setOpenedGifts(prev => {

            const updated = prev.includes(giftId)

                ? prev

                : [...prev, giftId];

            setTimeout(() => {

                if (updated.length === 3) {

                    changeScene("endingIntro");

                }

                else {

                    changeScene("gifts");

                }

            }, 100);

            return updated;

        });

    }

    return (

        <>

            {scene === "intro" && (
                <Intro
                    nextScene={() => changeScene("password")}
                />
            )}

            {scene === "password" && (
                <Password
                    nextScene={() => changeScene("start")}
                />
            )}

            {scene === "start" && (
                <StartScene
                    onStart={() => changeScene("memory")}
                />
            )}

            {scene === "memory" && (
                <MemoryScene
                    nextScene={() => changeScene("gifts")}
                />
            )}

            {scene === "gifts" && (
                <GiftsScene
                    nextScene={() => changeScene("album")}
                    nextHeartScene={() => changeScene("heartIntro")}
                    nextCakeScene={() => changeScene("cakeIntro")}
                    openedGifts={openedGifts}
                />
            )}

            {scene === "album" && (
                <AlbumScene
                    onFinish={() => finishMiniGame(0)}
                />
            )}

            {scene === "heartIntro" && (
                <HeartIntroScene
                    nextScene={() => changeScene("heartPuzzle")}
                />
            )}

            {scene === "heartPuzzle" && (
                <HeartPuzzleScene
                    nextScene={() => finishMiniGame(1)}
                />
            )}

            {scene === "cakeIntro" && (
                <CakeIntroScene
                    nextScene={() => changeScene("cakeGame")}
                />
            )}

            {scene === "cakeGame" && (
                <CakeGameScene
                    nextScene={() => finishMiniGame(2)}
                />
            )}

            {scene === "endingIntro" && (
                <EndingIntroScene
                    nextScene={() => changeScene("photo")}
                />
            )}

            {scene === "photo" && (
                <PhotoScene
                    nextScene={() => changeScene("envelope")}
                />
            )}

            {scene === "envelope" && (
                <EnvelopeScene />
            )}

            <div className={`fade ${fade ? "active" : ""}`}></div>

        </>

    );

}

export default App;