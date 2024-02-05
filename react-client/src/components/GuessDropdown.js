import {Dropdown} from "react-bootstrap";
import {DROPDOWN_PLACEHOLDER, OPTIONS} from "./constants";

/***
 * This component is used to display the dropdowns for the guesses.
 * @param props
 * @returns {JSX.Element}
 */
const GuessDropdown = (props) => {
    return (
        <Dropdown
            onSelect={(eventKey, event) =>
                props.handleDropdownSelect(eventKey, event, props.index)}>
            <Dropdown.Toggle
                variant="light"
                id={`dropdown-${props.index}`}
                data-index={props.index}
                className="w-100 shadow-lg">
                {props.selectedOption ?? DROPDOWN_PLACEHOLDER}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <>
                    <Dropdown.Item key={DROPDOWN_PLACEHOLDER}
                                   eventKey={DROPDOWN_PLACEHOLDER}
                                   disabled>{DROPDOWN_PLACEHOLDER}</Dropdown.Item>
                    {OPTIONS.map((option) => (
                        <Dropdown.Item key={option} eventKey={option}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default GuessDropdown;
