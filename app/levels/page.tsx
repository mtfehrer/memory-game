import styles from "../../styles/Levels.module.css";
import LevelPreview from "../../components/LevelPreview";

export default function Levels() {
    return (
        <div className={"header-margin " + styles.container}>
            <div className={styles.grid_container}>
                <LevelPreview
                    level={1}
                    unlocked={false}
                    stars={0}
                    difficulty="Easy"
                />
            </div>
        </div>
    );
}
