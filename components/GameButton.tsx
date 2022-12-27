import style from "../styles/GameButton.module.css";

type Props = {
    state: string;
    handleButtonClick: () => void;
};

export default function GameButton({ state, handleButtonClick }: Props) {
    let buttonLabel: string = "";

    if (state === "wait") {
        buttonLabel = "Start";
    } else if (state === "choose") {
        buttonLabel = "Finish";
    } else if (state === "lose") {
        buttonLabel = "Restart";
    } else if (state === "win") {
        buttonLabel = "Levels";
    } else {
        buttonLabel = "...";
    }

    return (
        <button className={style.container} onClick={handleButtonClick}>
            {buttonLabel}
        </button>
    );
}
