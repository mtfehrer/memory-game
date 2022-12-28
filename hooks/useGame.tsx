import { useState, useRef } from "react";
import Tile from "../components/Tile";
import { LevelData } from "../utils/Types";

export default function useGame(levelData: LevelData) {
    const width = useRef<number>(levelData.width);
    const height = useRef<number>(levelData.height);
    const [round, setRound] = useState<number>(1);
    const [state, setState] = useState<
        "wait" | "show" | "choose" | "win" | "lose"
    >("wait");
    const [currentShowIndex, setCurrentShowState] = useState<number>(0);
    const showTileIndexes = useRef<number[]>([]);
    const intervalKey = useRef<NodeJS.Timer>();
    const [chosenTileIndexes, setChosenTileIndexes] = useState<number[]>([]);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

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
                                    ? "red"
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
                                    ? "red"
                                    : "white"
                            }
                            onClick={handleTileClick}
                        />
                    );
                } else {
                    tiles.push(
                        <Tile
                            i={i}
                            j={j}
                            key={`${i}${j}`}
                            color="white"
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

    function handleButtonClick() {
        if (state === "wait") {
            setState("show");
            setChosenTileIndexes([]);
            showTileIndexes.current = chooseRandomTiles(
                levelData.roundData[round - 1][1]
            );
            intervalKey.current = setInterval(() => {
                setCurrentShowState((current) => {
                    if (current + 1 > showTileIndexes.current.length) {
                        clearInterval(intervalKey.current);
                        setState("choose");
                        return 0;
                    } else {
                        return current + 1;
                    }
                });
            }, levelData.roundData[round - 1][0]);
        } else if (state === "choose") {
            let a = showTileIndexes.current.sort();
            let b = chosenTileIndexes.sort();
            console.log(a);
            console.log(b);
            if (a.length === b.length) {
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        setState("lose");
                        setRound(-1);
                        return;
                    }
                }
                setRound((current) => {
                    if (current + 1 > levelData.rounds) {
                        setState("win");
                        return -1;
                    }
                    return current + 1;
                });
                setState("wait");
                return;
            }
            setState("lose");
            setRound(-1);
            return;
        }
        if (state === "lose") {
            //restart level
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
        setTimeInSeconds,
    };
}
