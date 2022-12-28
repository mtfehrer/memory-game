"use client";

//this will be a column list showing the stats for each level and other arbitrary stuff like time spent

import style from "../../styles/Stats.module.css";
import { useEffect } from "react";
import levelsData from "../../data/LevelsData.json";
import initialUserData from "../../data/InitialUserData.json";
import { UserData } from "../../utils/Types";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function StatsPage() {
    let userData: UserData = {};

    useEffect(() => {
        if (localStorage.getItem("userData") === null) {
            localStorage.setItem("userData", JSON.stringify(initialUserData));
        } else {
            userData = JSON.parse(localStorage.getItem("userData") as string);
        }
    }, []);

    function getStars(): JSX.Element[] {
        let result: JSX.Element[] = [];

        for (let i = 0; i < 5; i++) {
            if (userData[("" + (i + 1)) as keyof typeof userData]) {
                if (
                    i >
                    (
                        userData[("" + (i + 1)) as keyof typeof userData] as {
                            stars: number;
                        }
                    ).stars
                ) {
                    result.push(<FaRegStar />);
                }
            } else {
                result.push(<FaStar />);
            }
        }

        return result;
    }

    let listElements: JSX.Element[] = [];

    for (let i = 0; i < Object.keys(levelsData).length; i++) {
        listElements.push(
            <li className={style.list_item} key={i}>
                <h1>Level {i + 1}</h1>
                <h2>
                    Time:{" "}
                    {userData[("" + (i + 1)) as keyof typeof userData] ===
                    undefined
                        ? "0:00:00"
                        : /* @ts-ignore */
                          userData[("" + (i + 1)) as keyof typeof userData]
                              .time}
                </h2>
                <h2>
                    Tries:{" "}
                    {userData[("" + (i + 1)) as keyof typeof userData] ===
                    undefined
                        ? "0"
                        : "" /* @ts-ignore */ +
                          userData[("" + (i + 1)) as keyof typeof userData]
                              .tries}
                </h2>
                <h2>
                    Stars:{" "}
                    {userData[("" + (i + 1)) as keyof typeof userData] ===
                    undefined
                        ? "0"
                        : getStars()}
                </h2>
            </li>
        );
    }

    return (
        <div className={style.container}>
            <h1>Stats</h1>
            <div className={style.list_container}>
                {listElements.map((l) => l)}
            </div>
        </div>
    );
}
