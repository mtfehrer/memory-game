"use client";

import "../../styles/globals.css";
import style from "../../styles/Stats.module.css";
import { useState, useEffect } from "react";
import levelsData from "../../data/LevelsData.json";
import initialUserData from "../../data/InitialUserData.json";
import { UserData } from "../../utils/Types";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function StatsPage() {
    const [userData, setUserData] = useState<UserData>(initialUserData);

    useEffect(() => {
        if (localStorage.getItem("userData") === null) {
            localStorage.setItem("userData", JSON.stringify(initialUserData));
        } else {
            setUserData(JSON.parse(localStorage.getItem("userData") as string));
        }
    }, []);

    function getStars(stars: number): JSX.Element[] {
        let result: JSX.Element[] = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= stars) {
                result.push(<FaStar style={{ color: "gold" }} key={i} />);
            } else {
                result.push(<FaRegStar key={i} />);
            }
        }

        return result;
    }

    let listElements: JSX.Element[] = [];

    function resetStats() {
        localStorage.setItem("userData", JSON.stringify(initialUserData));
        localStorage.setItem("unlocked-levels", "[1]");
        setUserData(initialUserData);
    }

    for (let i = 0; i < Object.keys(levelsData).length; i++) {
        listElements.push(
            <li className={style.list_item} key={i}>
                <h1>Level {i + 1}</h1>
                <h2>
                    Best Time:{" "}
                    {userData[("" + (i + 1)) as keyof typeof userData].time}
                </h2>
                <h2>
                    Tries:{" "}
                    {userData[("" + (i + 1)) as keyof typeof userData].tries}
                </h2>
                <h2
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Stars:{"    "}
                    {getStars(
                        userData[("" + (i + 1)) as keyof typeof userData].stars
                    ).map((s) => s)}
                </h2>
            </li>
        );
    }

    return (
        <div className={style.container}>
            <h1 className="header-font">Stats</h1>
            <div className={style.list_container}>
                {listElements.map((l) => l)}
            </div>
            <button onClick={resetStats} className={style.reset_button}>
                Reset Stats
            </button>
        </div>
    );
}
