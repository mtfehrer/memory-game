import "../styles/globals.css";
import style from "../styles/Homepage.module.css";

export default function Main() {
    return (
        <div className={"header-margin " + style.container}>
            <div className={style.border_container}>
                <div className={style.inner_container_}>
                    <h1 className={style.massive_header_font}>Memory</h1>
                    <h1 className={style.massive_header_font}>Game</h1>
                </div>
                <div className={style.inner_container__}>
                    <h1 className={style.large_header_font}>Built</h1>
                    <h1 className={style.large_header_font}>using</h1>
                    <h1 className={style.large_header_font}>Next.js</h1>
                    <h1 className={style.large_header_font}>by</h1>
                    <h1 className={style.large_header_font}>Michael</h1>
                    <h1 className={style.large_header_font}>Fehrer</h1>
                </div>
            </div>
        </div>
    );
}
