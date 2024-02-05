import React from 'react';
import {Table} from 'react-bootstrap';

/***
 * This component is used to display a custom table with the given headers and data.
 * @param headers
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = ({headers, data}) => {
    return (
        <Table striped bordered hover variant="secondary">
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((value, index) => (
                        <td key={index}>{value}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default CustomTable;

