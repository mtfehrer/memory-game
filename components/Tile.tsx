import style from "../styles/Tile.module.css";

type Props = {
    i: number;
    j: number;
    color: string;
    choose?: boolean;
    onClick: (i: number, j: number) => void;
};

export default function Tile({ i, j, color, choose, onClick }: Props) {
    return (
        <div
            className={
                choose ? `${style.tile} ${style.tile_choose}` : style.tile
            }
            style={{ backgroundColor: color }}
            onClick={() => {
                onClick(i, j);
            }}
        ></div>
    );
}
