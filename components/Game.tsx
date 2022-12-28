"use client";

//five rounds for each level
//have random starting colors
//add flip animation
//remove vertical shift after round 1 info gets removed

import style from "../styles/Game.module.css";
import useGame from "../hooks/useGame";
import GameButton from "./GameButton";
import { LevelData } from "../utils/Types";

type Props = {
    levelNumber: number;
    levelData: LevelData;
};

export default function Game({ levelNumber, levelData }: Props) {
    const { getTiles, handleButtonClick, state, round } = useGame(levelData);

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
                <h1 className={style.level_header}>Level {levelNumber}</h1>
                <h1>
                    {/*@ts-ignore*/}
                    {isNaN(roundLabel) ? roundLabel : `Round ${roundLabel}`}
                </h1>
                {/*@ts-ignore*/}
                {levelNumber === "1" && roundLabel === "1" ? (
                    <h2>Choose the tiles you see in any order...</h2>
                ) : null}
            </div>
            <div
                className={style.grid}
                style={{
                    gridTemplateColumns: `repeat(${levelData.width}, 1fr)`,
                }}
            >
                {tiles.map((t) => t)}
            </div>
            <GameButton state={state} handleButtonClick={handleButtonClick} />
        </div>
    );
}
