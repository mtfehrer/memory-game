//this will be a column list showing the stats for each level and other arbitrary stuff like time spent

import style from "../../styles/Stats.module.css";

export default function StatsPage() {
    return (
        <div className={style.container}>
            <div className={style.list_container}>
                <h1 className="header-margin">Stats</h1>
            </div>
        </div>
    );
}
