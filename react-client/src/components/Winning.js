import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import wonImg from '../assets/img/miniboi.gif';
import HighscoresTable from "./tables/HighscoresTable";
import {SERVER_URL, NAME_REGEX_VALIDATION, SERVER_ERR_MSG, NOT_FOUND_ERR_MSG} from "./constants";

/***
 * Winning component - the component that appears when the user wins the game
 * displays the winning message and a form for submitting the score to the server
 * then displays the highscores table
 * @param score
 * @returns {JSX.Element}
 * @constructor
 */
export default function Winning({score}) {
    // =================== STATE ========================
    const [isFocused, setIsFocused] = useState(false);
    const [username, setUsername] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [msg, setMsg] = useState("");
    // =================== SETTERS ====================
    const setFocused = (value) => setIsFocused(value);
    // ==================== HANDLERS ===================
    const status = (response) => {
        if(response.status === 404)
            return Promise.reject(new Error(NOT_FOUND_ERR_MSG));
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        }
        return response.text().then(errorMessage => {
            throw new Error(errorMessage);
        });
    }
    const handleErrors = (error) => {setMsg(error.message??SERVER_ERR_MSG)}
    const fetchHighScores = async () => {
        await fetch(SERVER_URL)
            .then(status)
            .then((response) => response.json())
            .then((data) => {
                setMsg("");
                setHighScores(data);
            }).catch(handleErrors);
    }
    /***
     * This func for validating the username - must be 3-10 chars long
     * @param username - the username to validate
     * @returns {boolean} - true if valid, false otherwise
     */
    const validUsername = (username) => username && NAME_REGEX_VALIDATION.test(username);
    /**
     * This func for handling the submit event of the form - send the score to the server
     * @param event - the submit event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validUsername(username)) {
            return;
        }
        setUsername(username.trim().toLowerCase());
        // save the score to the server
        await handleSave();
    }
    /**
     * This func for handling the save event - send the score to the server
     * and then fetch the highscores table from the server in case of success
     * @returns {Promise<void>}
     */
    const handleSave = async () => {
        await fetch(SERVER_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                score: score
            })
        }).then(status)
            .then(async (data) => {
                setMsg('');
                // the form submitted successfully
                setIsSubmitted(true);
                await fetchHighScores();
            }).catch(handleErrors);
    }
    // =================== Render ===================
    return (
        <div className="scoreboard-won-section">
            {!isSubmitted && (
                <>
                    <div className="alert alert-success" role="alert">
                        <img src={wonImg} alt="Winner" className="img-fluid w-25"/>
                        <div>
                            <h2>Congratulations! You won! Your score is: {score}</h2>
                            <p>You may enter your name below to record your score.</p>
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit} className="w-100">
                        <Form.Group controlId="username">
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                isInvalid={!validUsername(username) && isFocused}
                                isValid={validUsername(username) && isFocused}
                                className={`my-3 ${isFocused ? 'border border-primary' : 'border-0 border-bottom border-dark'} shadow-lg`}
                            />
                            <Form.Control.Feedback type="invalid">
                                Username must be between 3 and 20 characters long and can contain only letters and
                                numbers.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
            )}
            {msg && <div className="alert alert-danger" role="alert">{msg}</div>}
            {isSubmitted && <HighscoresTable data={highScores}/>}
        </div>
    );
}
