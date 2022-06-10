import { useParams } from "react-router-dom";
import "./game.scss"

const Game = () => {

    const {name} = useParams();


    return(
        <div>
            {name}
        </div>
    )
};

export default Game;