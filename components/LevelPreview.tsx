import styles from "../styles/LevelPreview.module.css";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

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

    for (let i = 0; i < 5; i++) {
        if (i + 1 > stars) {
            starComponents.push(<FaRegStar key={i} />);
        } else {
            starComponents.push(<FaStar key={i} />);
        }
    }

    return (
        <a className={styles.link} href={"levels/" + level}>
            <div className={styles.container}>
                <span className={styles.title}>{"Level " + level}</span>
                <span>{difficulty}</span>
                <div>Score: {starComponents}</div>
            </div>
        </a>
    );
}
