type LevelData = {
    width: number;
    height: number;
    rounds: number;
    roundData: number[][];
    fiveStarTime: number;
    difficulty: string;
};

type UserData = {
    "1": { time: string; seconds: number; tries: number; stars: number };
    "2": { time: string; seconds: number; tries: number; stars: number };
    "3": { time: string; seconds: number; tries: number; stars: number };
    "4": { time: string; seconds: number; tries: number; stars: number };
    "5": { time: string; seconds: number; tries: number; stars: number };
    "6": { time: string; seconds: number; tries: number; stars: number };
};

export type { LevelData, UserData };
