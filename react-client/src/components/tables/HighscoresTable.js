import CustomTable from "./CustomTable";
import {HIGHSCORES_TABLE_HEADERS as HEADERS} from "../constants";

/***
 * This component is used to display the highscores table.
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const HighscoresTable = ({data}) => {
    return (
        <CustomTable headers={HEADERS} data={Object.entries(data).map(([key, value], index) => (
            {
                [HEADERS[0]]: index + 1,
                [HEADERS[1]]: value.username,
                [HEADERS[2]]: value.score
            }
        ))
        }/>
    );
}

export default HighscoresTable;
