"use client";

//five rounds for each level
//have random starting colors
//add flip animation
//remove vertical shift after round 1 info gets removed
//only set time and stars if they're new best

import style from "../styles/Game.module.css";
import useGame from "../hooks/useGame";
import GameButton from "./GameButton";
import { LevelData, UserData } from "../utils/Types";
import { useEffect } from "react";

type Props = {
    levelNumber: number;
    levelData: LevelData;
};

export default function Game({ levelNumber, levelData }: Props) {
    const {
        getTiles,
        handleButtonClick,
        state,
        round,
        timeInSeconds,
        setTimeInSeconds,
    } = useGame(levelData);

    useEffect(() => {
        setInterval(() => {
            setTimeInSeconds((current) => current + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        let userData: UserData = JSON.parse(
            localStorage.getItem("userData") as string
        );

        if (state === "win") {
            userData[("" + levelNumber) as keyof UserData].tries += 1;
            userData[("" + levelNumber) as keyof UserData].time = totalTime;
            userData[("" + levelNumber) as keyof UserData].stars =
                getStars(totalTime);
            localStorage.setItem("userData", JSON.stringify(userData));
        }
        if (state === "lose") {
            userData[("" + levelNumber) as keyof UserData].tries += 1;
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    }, [state]);

    let tiles: JSX.Element[] = getTiles();
    let roundLabel: string = "" + round;

    function getStars(time: string): number {
        return 0;
    }

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
                {levelNumber === "1" &&
                roundLabel === "1" &&
                state === "wait" ? (
                    <h2>Choose the tiles you see in any order...</h2>
                ) : (
                    <h2>Time: {timeInSeconds}</h2>
                )}
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
