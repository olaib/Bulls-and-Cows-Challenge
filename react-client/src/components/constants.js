export const GAME_RULES = [ // GAME RULES TEXT
        'The program generates a 4 digit number number, while the player tries to guess it.',
        '',
        'Each digit appears at most once. eg. 1234 is valid, but 1233 is not valid.',
        '',
        'For every guess that the player makes, we display 2 values:',
        'the number of bulls and the number of cows.1 bull means the guess contains a digit that appears in the target number in the correct position.',
        '1 cow means the guess contains a digit that appears in the target number, but in the wrong position.',
        '',
        'For example, if the number to guess is 1234, guessing 4321 will give 0 bulls and 4 cows.Guessing 3241 will give 1 bull and 3 cows.4 bulls means that the user won the game.'
    ],
    SERVER_URL = '/java_react_war/api/highscores',

    INVALID_GUESSES_MSG = "Please select 4 digits",
    DUBLICATE_GUESSES_MSG = "Please select 4 different digits",
    INIT_MSG = "Your history of guesses will appear bellow:",
    SERVER_ERR_MSG = "internal server error",
    NOT_FOUND_ERR_MSG = "404 not found , please try again later",
    SERVER_CONNECTION_FALIED = 'Unable to connect to server',
    DROPDOWN_PLACEHOLDER = "Guess ...",
    NUMS_SIZE = 4,
    RANGE = 10,
    EMPTY_GUESSES = Array(NUMS_SIZE).fill(null),
    OPTIONS = [...Array(RANGE).keys()],
    NAME_REGEX_VALIDATION = /^[a-zA-Z0-9]{3,20}$/,
    HIGHSCORES_TABLE_HEADERS = ['#', 'Username', 'Score'], // HIGHSCORES TABLE HEADERS
    HISTORY_GUESSES_TABLE_HEADERS = ['#', 'Guess', 'Bulls', 'Cows']; // HISTORY GUESSES TABLE HEADERS


