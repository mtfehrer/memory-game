import { useState, useRef } from "react";
import Tile from "../components/Tile";
import { LevelData } from "../utils/Types";

export default function useGame(levelData: LevelData) {
    const width = useRef<number>(levelData.width);
    const height = useRef<number>(levelData.height);
    const [round, setRound] = useState<number>(1);
    const [state, setState] = useState<
        "wait" | "wait for show" | "show" | "choose" | "win" | "lose"
    >("wait");
    const [currentShowIndex, setCurrentShowIndex] = useState<number>(0);
    const showTileIndexes = useRef<number[]>([]);
    const intervalKey = useRef<NodeJS.Timer>();
    const [chosenTileIndexes, setChosenTileIndexes] = useState<number[]>([]);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const timeRunning = useRef<boolean>(false);
    const timeIntervalKey = useRef<NodeJS.Timer>();
    const [greenTiles, setGreenTiles] = useState<boolean>(false);

    function getTiles(): JSX.Element[] {
        let tiles: JSX.Element[] = [];
        for (let i = 0; i < width.current; i++) {
            for (let j = 0; j < height.current; j++) {
                if (state === "show") {
                    tiles.push(
                        <Tile
                            i={i}
                            j={j}
                            key={`${i}${j}`}
                            color={
                                ijToI(i, j) ===
                                showTileIndexes.current[currentShowIndex]
                                    ? "#404040"
                                    : "white"
                            }
                            onClick={handleTileClick}
                        />
                    );
                } else if (state === "choose") {
                    tiles.push(
                        <Tile
                            i={i}
                            j={j}
                            choose={true}
                            key={`${i}${j}`}
                            color={
                                chosenTileIndexes.includes(ijToI(i, j))
                                    ? "#404040"
                                    : "white"
                            }
                            onClick={handleTileClick}
                        />
                    );
                } else if (state === "lose") {
                    tiles.push(
                        <Tile
                            i={i}
                            j={j}
                            key={`${i}${j}`}
                            color="red"
                            onClick={handleTileClick}
                        />
                    );
                } else {
                    tiles.push(
                        <Tile
                            i={i}
                            j={j}
                            key={`${i}${j}`}
                            color={greenTiles === true ? "green" : "white"}
                            onClick={handleTileClick}
                        />
                    );
                }
            }
        }
        return tiles;
    }

    function ijToI(i: number, j: number): number {
        return i * width.current + j;
    }

    function iToIJ(n: number): number[] {
        return [Math.floor(n / width.current), n % width.current];
    }

    function chooseRandomTiles(amount: number): number[] {
        let result: number[] = [];

        while (result.length < amount) {
            result.push(
                Math.floor(Math.random() * (width.current * height.current))
            );
            //@ts-ignore
            result = [...new Set(result)];
        }

        return result;
    }

    function handleTileClick(i: number, j: number) {
        if (state === "choose") {
            setChosenTileIndexes((current) => {
                if (current.includes(ijToI(i, j))) {
                    return current.filter((c) => c !== ijToI(i, j));
                } else {
                    return [...current, ijToI(i, j)];
                }
            });
        }
    }

    function startRound() {
        //clear user and show tiles
        setChosenTileIndexes([]);
        showTileIndexes.current = [];

        //start show sequence
        //setRound function only used to get current round
        setRound((current) => {
            showTileIndexes.current = chooseRandomTiles(
                levelData.roundData[current - 1][1]
            );
            return current;
        });

        intervalKey.current = setInterval(() => {
            setCurrentShowIndex((current) => {
                if (current === showTileIndexes.current.length - 1) {
                    clearInterval(intervalKey.current);
                    setState("choose");
                    return 0;
                } else {
                    return current + 1;
                }
            });
        }, levelData.roundData[round - 1][0]);
    }

    function validateTiles() {
        let a = showTileIndexes.current.sort();
        let b = chosenTileIndexes.sort();
        if (a.length === b.length) {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    function startTimer() {
        timeIntervalKey.current = setInterval(() => {
            setTimeInSeconds((current) => current + 1);
        }, 1000);
        timeRunning.current = true;
    }

    function stopTimer() {
        clearInterval(timeIntervalKey.current);
        timeRunning.current = false;
    }

    function handleButtonClick() {
        if (state === "wait") {
            startTimer();
            setState("wait for show");

            //wait 0.5 seconds before starting the round
            setTimeout(() => {
                setState("show");
                startRound();
            }, 500);
        }
        if (state === "choose") {
            let result = validateTiles();
            if (result) {
                setGreenTiles(true);
                if (round === levelData.rounds) {
                    setState("win");
                    setRound(-1);
                    stopTimer();
                } else {
                    setRound((current) => current + 1);
                    setState("wait for show");

                    //wait 0.5 seconds before next round
                    setTimeout(() => {
                        setGreenTiles(false);
                        setTimeout(() => {
                            setState("show");
                            startRound();
                        }, 500);
                    }, 500);
                }
            } else {
                setState("lose");
                setRound(-1);
                stopTimer();
            }
        }
        if (state === "lose") {
            setState("wait");
            setRound(1);
        }
    }

    return {
        getTiles,
        handleButtonClick,
        state,
        round,
        timeInSeconds,
    };
}
