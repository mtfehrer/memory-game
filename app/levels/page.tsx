"use client";

import "../../styles/globals.css";
import styles from "../../styles/Levels.module.css";
import LevelPreview from "../../components/LevelPreview";
import levelsData from "../../data/LevelsData.json";
import { UserData } from "../../utils/Types";
import initialUserData from "../../data/InitialUserData.json";

import { useState, useEffect } from "react";

export default function Levels() {
    const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);
    const [userData, setUserData] = useState<UserData>(initialUserData);
    let levelPreviews: JSX.Element[] = [];

    useEffect(() => {
        if (!localStorage.getItem("unlocked-levels")) {
            localStorage.setItem("unlocked-levels", "[1]");
            setUnlockedLevels([1]);
        } else {
            setUnlockedLevels(
                JSON.parse(localStorage.getItem("unlocked-levels") as string)
            );
        }
        if (!localStorage.getItem("userData")) {
            localStorage.setItem("userData", JSON.stringify(initialUserData));
        } else {
            setUserData(JSON.parse(localStorage.getItem("userData") as string));
        }
    }, []);

    for (let i = 1; i <= 6; i++) {
        levelPreviews.push(
            <LevelPreview
                level={i}
                unlocked={unlockedLevels.includes(i) ? true : false}
                stars={userData[`${i}` as keyof typeof userData].stars}
                difficulty={
                    levelsData[`${i}` as keyof typeof levelsData].difficulty
                }
                key={i}
            />
        );
    }

    return (
        <div className={"header-margin " + styles.container}>
            <div className={styles.grid_container}>
                {levelPreviews.map((l) => l)}
            </div>
        </div>
    );
}
