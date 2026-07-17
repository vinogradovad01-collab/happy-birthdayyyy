import dialogueImage from "../assets/images/ui/dialogueCharacter.png";
import TypingText from "./TypingText";

function CharacterDialogue({
  text,
  onComplete,
}) {

  return (
    <div className="character-dialogue">

      <img
        src={dialogueImage}
        alt="Диалог"
        className="dialogue-image"
      />

      <div className="dialogue-text">

        <TypingText
          text={text}
          speed={40}
          color="#ffe8f2"
          onComplete={onComplete}
        />

      </div>

    </div>
  );
}

export default CharacterDialogue;