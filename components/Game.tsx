"use client";

//have several states,
//waiting for start, show user tiles (in order animation), let user choose, result
//five rounds for each level

import styles from "../styles/Game.module.css";
import { useState } from "react";
import Tile from "./Tile";

type Props = {
    width: number;
    height: number;
    speed: number;
};

export default function Game({ width, height, speed }: Props) {
    const [state, setState] = useState<"wait" | "show" | "choose">("wait");
    const [currentShowIndex, setCurrentShowIndex] = useState<number>(0);
    const [showMax, setShowMax] = useState<number>(2);
    const [showIndexes, setShowIndexes] = useState<number[]>([]);

    let tiles: JSX.Element[] = [];

    //initialize tiles
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (i * tiles.length + j === showIndexes[currentShowIndex]) {
                //set it to color
            }
            tiles.push(<div className="tile" key={`${i}${j}`}></div>);
        }
    }

    function chooseRandomTiles(amount: number): number[] {
        let result = [];

        for (let i = 0; i < amount; i++) {
            result.push(Math.floor(Math.random() * tiles.length));
        }

        return result;
    }

    function start() {
        if (state === "wait") {
            setState("show");
            setShowIndexes(chooseRandomTiles(2));
            setInterval(() => {
                setCurrentShowIndex((current) => current + 1);
            }, 100);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.tile}></div>
                <div className={styles.tile}></div>
                <div className={styles.tile}></div>
                <div className={styles.tile}></div>
            </div>
            <button onClick={start}>Start</button>
        </div>
    );
}
