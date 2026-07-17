import { useState } from "react";

import background from "../assets/images/background.jpg";
import album from "../assets/images/ui/album.png";

import AlbumTypingText from "../components/AlbumTypingText";
import { albumPages } from "../data/albumPages";

function AlbumScene({ onFinish }) {

    const [pageIndex, setPageIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [fade, setFade] = useState(false);

    const page = albumPages[pageIndex];

    if (!page) return null;

    function handleClick() {

        if (!finished) return;

        if (pageIndex >= albumPages.length - 1) {

    onFinish();

    return;

}

        setFade(true);

        setTimeout(() => {

            setPageIndex(prev => prev + 1);

            setFinished(false);
            setFade(false);

        }, 500);

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

            <img
                src={album}
                className="album"
                alt=""
            />

<div className="album-photos">

    {page.layout === "single" && (

        <img
            src={page.photos[0]}
            className="album-photo-single"
            alt=""
        />

    )}
    {page.layout === "double" && (

    <>

        <img
            src={page.photos[0]}
            className="album-photo-double-left"
            alt=""
        />

        <img
            src={page.photos[1]}
            className="album-photo-double-right"
            alt=""
        />

    </>

)}
    {page.layout === "triple-horizontal" && (

    <>

        <img
            src={page.photos[0]}
            className="album-photo-horizontal-top"
            alt=""
        />

        <img
            src={page.photos[1]}
            className="album-photo-horizontal-middle"
            alt=""
        />

        <img
            src={page.photos[2]}
            className="album-photo-horizontal-bottom"
            alt=""
        />

    </>)}
    {page.layout === "mix" && (

    <>

        <img
            src={page.photos[0]}
            className="album-photo-mix-top-left"
            alt=""
        />

        <img
            src={page.photos[1]}
            className="album-photo-mix-top-right"
            alt=""
        />

        <img
            src={page.photos[2]}
            className="album-photo-mix-bottom"
            alt=""
        />

    </>

)}

</div>

            <div className={`album-text ${fade ? "album-hidden" : ""}`}>

                <AlbumTypingText
                    key={pageIndex}
                    text={page.text}
                    speed={35}
                    onComplete={() => setFinished(true)}
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

export default AlbumScene;
