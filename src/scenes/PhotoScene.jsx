import { useEffect, useState } from "react";

import background from "../assets/images/background.jpg";

import photo1 from "../assets/photos2/photo1.png";
import photo2 from "../assets/photos2/photo2.png";
import photo3 from "../assets/photos2/photo3.png";
import photo4 from "../assets/photos2/photo4.png";
import photo5 from "../assets/photos2/photo5.png";
import photo6 from "../assets/photos2/photo6.png";
import photo7 from "../assets/photos2/photo7.png";
import photo8 from "../assets/photos2/photo8.png";
import photo9 from "../assets/photos2/photo9.png";
import photo10 from "../assets/photos2/photo10.png";
import photo11 from "../assets/photos2/photo11.png";
import photo12 from "../assets/photos2/photo12.png";
import photo13 from "../assets/photos2/photo13.png";
import photo14 from "../assets/photos2/photo14.png";

function PhotoScene({ nextScene }) {

    const photos = [
        photo1,
        photo2,
        photo3,
        photo4,
        photo5,
        photo6,
        photo7,
        photo8,
        photo9,
        photo10,
        photo11,
        photo12,
        photo13,
        photo14
    ];

    const [visiblePhotos, setVisiblePhotos] = useState([]);

    useEffect(() => {

        let index = 0;

        const interval = setInterval(() => {

            if (index >= photos.length) {

                clearInterval(interval);

                setTimeout(() => {

                    nextScene();

                }, 3200);

                return;

            }

            setVisiblePhotos(prev => [

                ...prev,

                {

                    id: index,

                    src: photos[index],

                    left: Math.random() * 80,

                    top: Math.random() * 85,

                    rotate: Math.random() * 80 - 40,

                    scale: Math.random() * 0.45 + 0.8,

                    moveX: Math.random() * 260 - 130,

                    moveY: Math.random() * 180 - 90

                }

            ]);

            index++;

        }, 300);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="photo-scene">

            <img
                src={background}
                className="background"
                alt=""
            />

            {visiblePhotos.map(photo => (

                <img

                    key={photo.id}

                    src={photo.src}

                    className="memory-photo"

                    style={{

                        left: `${photo.left}%`,
                        top: `${photo.top}%`,

                        transform: `
                            translate(${photo.moveX}px, ${photo.moveY}px)
                            rotate(${photo.rotate}deg)
                            scale(${photo.scale})
                        `

                    }}

                    alt=""

                />

            ))}

        </div>

    );

}

export default PhotoScene;