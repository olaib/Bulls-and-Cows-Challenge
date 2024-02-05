import {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Banner from "./Banner";
import Winning from "./Winning";
import GuessDropdown from "./GuessDropdown";
import HistoryGuessesTable from "./tables/HistoryGuessesTable";
import {
    EMPTY_GUESSES,
    INIT_MSG,
    NUMS_SIZE,
    RANGE,
    INVALID_GUESSES_MSG, DUBLICATE_GUESSES_MSG,
} from "./constants";

/***
 * Game component - the main component of the game - contains all the logic
 * @returns {JSX.Element}
 * @constructor
 */
const Game = () => {
    // =================== STATE ========================
    const [randomNums, setRandomNums] = useState(generateRandomNumbers);// generate random nums - solution
    const [guessHistory, setGuessHistory] = useState([]);// history of guesses
    const [isOpen, setOpen] = useState(false);// rules modal
    const [guessNums, setGuessNums] = useState(EMPTY_GUESSES);// current guess - of user
    const [isWon, setIsWon] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isValid, setIsValid] = useState(true);// is guess valid - 4 digits && no duplicates
    const [msg, setMsg] = useState(INIT_MSG);// message to display to user
    // =================== SETTERS ====================
    const toggleRules = () => setOpen(!isOpen);
    const handlePress = () => setIsPressed(true);
    const handleRelease = () => setIsPressed(false);

    // ==================== HANDLERS ===================
    /**
     * This func for generating random numbers - solution
     * @returns {number[]} - array of 4 random numbers
     */
    function generateRandomNumbers() {
        //prevent duplicates
        let randNums = new Set();
        while (randNums.size < NUMS_SIZE) {
            let rand = Math.floor(Math.random() * RANGE);
            randNums.add(rand);
        }
        const RandNumbnessToArr = Array.from(randNums);
        console.log(`Game starting...\nGuessed is: [${RandNumbnessToArr}]`)
        return RandNumbnessToArr;
    }

    /**
     * This func for starting a new game - reset all states
     */
    function newGame() {
        setRandomNums(generateRandomNumbers);
        setGuessHistory([]);
        setGuessNums(EMPTY_GUESSES);
        setIsWon(false);
    }

    /***
     * This func for handling the guess - check if valid - contains 4 digits
     * @returns {boolean} - true if guess is valid, false otherwise
     */
    const isGuessValid = () => guessNums.every((num) => num !== null);
    /**
     * This func checks if the user won the game - 4 bulls which means the user guessed the solution
     * @param bulls
     */
    const checkIfWon = (bulls) => {
        if (bulls === NUMS_SIZE) {
            setIsWon(true);
        }
    }
    /**
     * Handle the dropdown select - update the guessNums array
     * @param eventKey - the selected value
     * @param event - event object
     * @param index - index of the guessNums array
     */
    const handleDropdownSelect = (eventKey, event, index) => {
        const newGuessNums = [...guessNums];
        newGuessNums[index] = +eventKey;
        setGuessNums(newGuessNums);
    }

    /**
     * this func calculates the bulls and cows for the current guess
     * bulls: the number of digits that appear in the target number in the correct position.
     * cows: the number of digits that appear in the target number but in the wrong position.
     * @returns {{cows: number, bulls: number}} - the number of bulls and cows
     *
     */
    function calculateCowsBulls() {
        let [bulls, cows] = [0, 0];
        guessNums.forEach((num, index) => {
            if (num === randomNums[index]) {
                bulls++;
            } else if (randomNums.includes(num)) {
                cows++;
            }
        });
        return {bulls, cows};
    }

    /**
     * This func checks if the user entered duplicate numbers using Set
     * @param guessNums
     * @returns {boolean}
     */
    const checkIfDuplicate = (guessNums) => {
        return new Set(guessNums).size !== guessNums.length
    }
    /**
     * This func handles the guess button click - check if valid, duplicate, calculate bulls and cows
     * and if duplicates or invalid - display error message
     * and update the guess history table
     * and check if the user won the game - 4 bulls then display winning modal
     */
    const guessHandler = () => {
        //check if valid - 4 digits
        if (!isGuessValid()) {
            setIsValid(false);
            setMsg(INVALID_GUESSES_MSG);
        }
        //check if duplicate
        else if (checkIfDuplicate(guessNums)) {
            setMsg(DUBLICATE_GUESSES_MSG);
            setIsValid(false);
        } else {
            setIsValid(true);
            const {bulls, cows} = calculateCowsBulls();
            //update guess history table
            const newGuess = {guess: guessNums, bulls: bulls, cows: cows};
            setGuessHistory([...guessHistory, newGuess]);
            setMsg(`Your Guess is: ${bulls} Bulls + ${cows} Cows`);
            checkIfWon(bulls);
        }
    }
    /**
     * This func resets the guessNums array
     */
    const resetDropdowns = () => {
        setGuessNums(EMPTY_GUESSES)
    }
    // =================== RENDER ======================
    return (
        <Container className="border p-3 shadow-lg rounded" style={{backgroundColor: '#D1F9FF'}}>
            <Banner toggleRules={toggleRules} isOpen={isOpen} newGame={newGame} isWon={!isWon}/>
            {!isWon &&
                <Row>
                    <Row className={'p-3 mb-2'}>
                        <Row className="text-lg-start">
                            <>
                                {guessNums.map((selectedOption, index) => (
                                    <Col sm={3} key={index} className="mb-2 p-3">
                                        <GuessDropdown selectedOption={selectedOption}
                                                       handleDropdownSelect={handleDropdownSelect} index={index}/>
                                    </Col>
                                ))}
                            </>
                        </Row>
                        <Row>
                            <Col className="p-3 mb-2 text-lg-start">
                                <Button
                                    variant={isPressed ? 'primary' : 'dark'}
                                    size="lg"
                                    onMouseDown={handlePress}
                                    onMouseUp={handleRelease}
                                    onTouchStart={handlePress}
                                    onTouchEnd={handleRelease}
                                    onClick={guessHandler}
                                    data-toggle="tooltip" data-placement="bottom" title="Click to guess"
                                    style={{
                                        borderRadius: '10px',
                                        boxShadow: isPressed ? 'none' : '0 9px #999',
                                        transform: isPressed ? 'translateY(1px)' : 'none',
                                    }}>
                                    GO!
                                </Button>
                            </Col>
                            <Col className="p-3 mb-2 text-lg-end">
                                <Button variant="info" size="lg" onClick={resetDropdowns} className="ms-3"
                                        data-toggle="tooltip" data-placement="bottom"
                                        title="Click to reset your guesses"
                                >
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                        {!isValid &&
                            <Row>
                                <Col className="p-3 mb-2 text-lg-start">
                                    <div className="p-3 mb-2 text-lg-start border shadow-lg"
                                         style={{backgroundColor: "#F5EACB"}}>
                                        {msg}
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Row>
                    <hr style={{color: 'black', backgroundColor: 'black', height: 4}}/>
                    <Row className={'mx-auto p-3 mb-2'}>
                        <HistoryGuessesTable data={guessHistory}/>
                    </Row>
                </Row>}
            {isWon && <Winning score={guessHistory.length}/>}
        </Container>
    );
}

export default Game;

