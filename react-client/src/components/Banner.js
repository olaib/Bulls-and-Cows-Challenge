import {Button, ButtonGroup, Card, Col, Collapse, Image, Row} from "react-bootstrap";
import gameImg from "../assets/img/cover.png";
import guessImage from "../assets/img/guess-who2.gif";
import {GAME_RULES} from "./constants";

/***
 * This component is used to display the banner of the game
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Banner = (props) => {
    return (
        <section id={"banner-container"}>
            <Row className="mt-0">
                <Col sm={12}>
                    <Image className="img img-fluid w-100 h-75" src={gameImg} alt="Game Img"/>
                </Col>
            </Row>
            <Row className="d-flex flex-wrap justify-content-between align-items-center">
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                    <ButtonGroup className="w-100">
                        <Button
                            onClick={props.toggleRules}
                            aria-controls="game-rules"
                            aria-expanded={props.isOpen}
                            className="shadow-lg rounded-pill w-100"
                            variant="warning" size="md"
                        >
                            Game Rules
                        </Button>
                    </ButtonGroup>
                </Col>
                {!props.isWon && <Col xs={12} md={4}>
                    <Image className="img img-fluid w-50" src={guessImage} alt="Guess Img"/>
                </Col>}
                <Col xs={12} md={4}>
                    <ButtonGroup className="w-100">
                        <Button className="shadow-lg rounded-pill w-100" variant="danger" size="md" onClick={props.newGame}>
                            Start New Game
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col xs={12} className="mt-5">
                    <Collapse in={props.isOpen} dimension="width">
                        <div id="game-rules">
                            <Card className="text-lg-start bg-opacity-75 shadow-lg bg-warning" body>
                                <p>{GAME_RULES.map((row) =>
                                    <>
                                        {row}
                                        <br>
                                        </br>
                                    </>)
                                })
                                </p>
                            </Card>
                        </div>
                    </Collapse>
                </Col>
            </Row>

        </section>
    );
}

export default Banner;
