"use client";

import "../../../styles/globals.css";
import { useState, useEffect } from "react";
import levelsData from "../../../data/LevelsData.json";
import Game from "../../../components/Game";

export default function LevelPage({ params }: any) {
    const [access, setAccess] = useState<boolean>(true);

    useEffect(() => {
        if (!localStorage.getItem("unlocked-levels")?.includes(params.level)) {
            setAccess(false);
        }
    }, []);

    return (
        <div className="header-margin">
            {access ? (
                <Game
                    levelNumber={params.level}
                    levelData={
                        levelsData[params.level as keyof typeof levelsData]
                    }
                />
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h1 className="header-font">ACCESS DENIED</h1>
                </div>
            )}
        </div>
    );
}
