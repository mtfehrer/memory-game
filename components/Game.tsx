"use client";

import "../styles/globals.css";
import style from "../styles/Game.module.css";
import useGame from "../hooks/useGame";
import GameButton from "./GameButton";
import { LevelData, UserData } from "../utils/Types";
import { useEffect } from "react";

type Props = {
    levelNumber: string;
    levelData: LevelData;
};

export default function Game({ levelNumber, levelData }: Props) {
    const { getTiles, handleButtonClick, state, round, timeInSeconds } =
        useGame(levelData);

    useEffect(() => {
        let userData: UserData = JSON.parse(
            localStorage.getItem("userData") as string
        );
        let unlockedLevels = JSON.parse(
            localStorage.getItem("unlocked-levels") as string
        );

        if (state === "win") {
            //update user data
            userData[("" + levelNumber) as keyof UserData].tries += 1;
            if (
                userData[("" + levelNumber) as keyof UserData].seconds === 0 ||
                userData[("" + levelNumber) as keyof UserData].seconds >
                    timeInSeconds
            ) {
                userData[("" + levelNumber) as keyof UserData].seconds =
                    timeInSeconds;
                userData[("" + levelNumber) as keyof UserData].time =
                    parseTime(timeInSeconds);
                userData[("" + levelNumber) as keyof UserData].stars =
                    getStars(timeInSeconds);
            }

            //add next level to unlocked levels
            unlockedLevels.push(parseInt(levelNumber) + 1);

            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem(
                "unlocked-levels",
                JSON.stringify(unlockedLevels)
            );
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
        if (userTime <= levelData.fiveStarTime + 2) {
            return 4;
        }
        if (userTime <= levelData.fiveStarTime + 4) {
            return 3;
        }
        if (userTime <= levelData.fiveStarTime + 6) {
            return 2;
        }
        if (userTime <= levelData.fiveStarTime + 8) {
            return 1;
        }
        return 0;
    }

    function parseTime(seconds: number): string {
        return new Date(seconds * 1000).toISOString().substring(14, 19);
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
                <h1 className="header-font">Level {levelNumber}</h1>
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
