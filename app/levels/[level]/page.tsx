"use client";

import { useState, useEffect } from "react";
import levelData from "../../../data/levelData.json";
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
                <Game width={2} height={2} speed={2} level={params.level} />
            ) : (
                "ACCESS DENIED"
            )}
        </div>
    );
}
