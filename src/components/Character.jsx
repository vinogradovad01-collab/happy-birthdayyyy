function Character({ image, className = "" }) {

    return (
        <img
            src={image}
            className={`character ${className}`}
            alt=""
        />
    );

}

export default Character;