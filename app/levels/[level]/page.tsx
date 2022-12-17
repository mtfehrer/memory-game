"use client";

import { useState, useEffect } from "react";
import levelData from "../../../data/levelData.json";

export default function LevelPage({ params }: any) {
    const [access, setAccess] = useState<boolean | null>(null);

    useEffect(() => {
        if (localStorage.getItem("unlocked-levels")?.includes(params.level)) {
            setAccess(true);
        }
    }, []);

    return <div>{access ? "ACCESS ACCEPTED" : "ACCESS DENIED"}</div>;
}
