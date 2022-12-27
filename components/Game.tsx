"use client";

//have several states,
//waiting for start, show user tiles (in order animation), let user choose, result
//five rounds for each level
//have random starting colors
//add flip animation

import style from "../styles/Game.module.css";
import useGame from "../hooks/useGame";
import GameButton from "./GameButton";

type Props = {
    width: number;
    height: number;
    speed: number;
    level: number;
};

export default function Game({ width, height, speed, level }: Props) {
    const { getTiles, handleButtonClick, state, round } = useGame(
        width,
        height
    );

    let tiles: JSX.Element[] = getTiles();
    let roundLabel: string = "" + round;

    if (round === -1) {
        if (state === "win") {
            roundLabel = "You Win";
        } else if (state === "lose") {
            roundLabel = "You Lose";
        }
    }

    return (
        <div className={style.container}>
            <div className={style.header_container}>
                <h1 className={style.level_header}>Level {level}</h1>

                <h1>
                    {/*@ts-ignore*/}
                    {isNaN(roundLabel) ? roundLabel : `Round ${roundLabel}`}
                </h1>
            </div>
            <div className={style.grid}>{tiles.map((t) => t)}</div>
            <GameButton state={state} handleButtonClick={handleButtonClick} />
        </div>
    );
}
