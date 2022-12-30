"use client";

//five rounds for each level
//have random starting colors
//add flip animation
//remove vertical shift after round 1 info gets removed
//only set time and stars if they're new best
//start time only when user starts for the first time

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
            setTimeInSeconds((current) => current + 0.5);
        }, 1000);
    }, []);

    useEffect(() => {
        let userData: UserData = JSON.parse(
            localStorage.getItem("userData") as string
        );

        if (state === "win") {
            userData[("" + levelNumber) as keyof UserData].tries += 1;
            if (
                userData[("" + levelNumber) as keyof UserData].time <
                parseTime(timeInSeconds)
            ) {
                userData[("" + levelNumber) as keyof UserData].time =
                    parseTime(timeInSeconds);
                userData[("" + levelNumber) as keyof UserData].stars =
                    getStars(timeInSeconds);
            }
            localStorage.setItem("userData", JSON.stringify(userData));
        }
        if (state === "lose") {
            userData[("" + levelNumber) as keyof UserData].tries += 1;
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    }, [state]);

    let tiles: JSX.Element[] = getTiles();
    let roundLabel: string = "" + round;

    function getStars(userTime: number): number {
        if (userTime <= levelData.fiveStarTime) {
            return 5;
        }
        if (userTime <= levelData.fiveStarTime - 5) {
            return 4;
        }
        if (userTime <= levelData.fiveStarTime - 10) {
            return 3;
        }
        if (userTime <= levelData.fiveStarTime - 15) {
            return 2;
        }
        if (userTime <= levelData.fiveStarTime - 20) {
            return 1;
        }
        return 0;
    }

    function parseTime(seconds: number): string {
        let result: string =
            "" + Math.floor(seconds / 60) + ":" + (seconds % 60);
        if (result[-2] == ":") {
            result = "" + Math.floor(seconds / 60) + ":0" + (seconds % 60);
        }
        return result;
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
