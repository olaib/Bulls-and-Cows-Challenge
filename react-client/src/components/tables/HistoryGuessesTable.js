import CustomTable from './CustomTable';
import {HISTORY_GUESSES_TABLE_HEADERS as HEADERS} from '../constants';

/***
 * This component is used to display the history guesses table.
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryGuessesTable = ({data}) => {
    return (
        <CustomTable headers={HEADERS} data={Object.entries(data).map(([key, value], index) => (
            {
                [HEADERS[0]]: index + 1,
                [HEADERS[1]]: value.guess,
                [HEADERS[2]]: value.bulls,
                [HEADERS[3]]: value.cows
            }
        ))
        }/>
    );
}

export default HistoryGuessesTable;
