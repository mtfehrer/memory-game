import styles from "../styles/LevelPreview.module.css";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

type Props = {
    level: number;
    unlocked: boolean;
    stars: number;
    difficulty: string;
};

export default function LevelPreview({
    level,
    unlocked,
    stars,
    difficulty,
}: Props) {
    let starComponents = [];
    let returnElement: JSX.Element;

    for (let i = 0; i < 5; i++) {
        if (i + 1 > stars) {
            starComponents.push(<FaRegStar key={i} />);
        } else {
            starComponents.push(<FaStar style={{ color: "gold" }} key={i} />);
        }
    }

    if (unlocked) {
        returnElement = (
            <a className={styles.link} href={"levels/" + level}>
                <div className={styles.container}>
                    <span className={styles.title}>{"Level " + level}</span>
                    <span>{difficulty}</span>
                    <div>Score: {starComponents}</div>
                    <h1 style={{ color: "green" }}>
                        <FaLockOpen />
                    </h1>
                </div>
            </a>
        );
    } else {
        returnElement = (
            <div className={styles.container}>
                <span className={styles.title} style={{ color: "gray" }}>
                    {"Level " + level}
                </span>
                <span style={{ color: "gray" }}>{difficulty}</span>
                <div style={{ color: "gray" }}>Score: {starComponents}</div>
                <h1 style={{ color: "red" }}>
                    <FaLock />
                </h1>
            </div>
        );
    }

    return returnElement;
}
