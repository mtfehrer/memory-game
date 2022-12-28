type LevelData = {
    width: number;
    height: number;
    rounds: number;
    roundData: number[][];
};

type UserData = {
    "1": { time: string; tries: number; stars: number };
    "2": { time: string; tries: number; stars: number };
    "3": { time: string; tries: number; stars: number };
    "4": { time: string; tries: number; stars: number };
    "5": { time: string; tries: number; stars: number };
    "6": { time: string; tries: number; stars: number };
};

export type { LevelData, UserData };
