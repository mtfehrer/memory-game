import style from "../styles/GameButton.module.css";
import Link from "next/link";

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
    } else if (state === "lose") {
        buttonLabel = "Restart";
    } else if (state === "show" || state === "wait for show") {
        buttonLabel = "...";
    }

    let buttonElement: JSX.Element = (
        <button className={style.container} onClick={handleButtonClick}>
            {buttonLabel}
        </button>
    );

    if (state === "win") {
        buttonElement = (
            <button className={style.container} onClick={handleButtonClick}>
                <Link className={style.link} href="/levels/">
                    {buttonLabel}
                </Link>
            </button>
        );
    }

    return <>{buttonElement}</>;
}
