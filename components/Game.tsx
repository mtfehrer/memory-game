"use client";

//have several states,
//waiting for start, show user tiles (in order animation), let user choose, result
//five rounds for each level

import styles from "../styles/Game.module.css";
import { useState } from "react";

type Props = {
    width: number;
    height: number;
    speed: number;
};

export default function Game({ width, height, speed }: Props) {
    const [state, setState] = useState<"wait" | "show" | "choose">("wait");

    let tiles: JSX.Element[] = [];
    let keys: string[] = [];

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            tiles.push(<div className="tile" key={`${i}${j}`}></div>);
            keys.push(`${i}${j}`);
        }
    }

    function start() {
        if (state === "wait") {
            setState("show");
            setInterval(() => {
                //choose two tiles to turn on then off
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
