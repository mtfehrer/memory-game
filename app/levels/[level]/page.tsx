"use client";

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
                "ACCESS DENIED"
            )}
        </div>
    );
}
