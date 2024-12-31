import React, { useState } from "react";

function Matrix({onMatrixChange}){
        const [matrix, setMatrix] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

        const handleMatrixChange = (row, column, val) => {
            const newMatrix = matrix.map((row) => [...row]);
            newMatrix[row][column] = val;
            setMatrix(newMatrix);
            onMatrixChange(newMatrix);
        }

        return (
            <div className="matrix">
                <h2>Matrix</h2>
                <table>
                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((val, columnIndex) => (
                                    <td key={columnIndex}>
                                        <input type="number" value={val} onChange={(event) => handleMatrixChange(rowIndex, columnIndex, parseInt(event.target.value))}/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default Matrix;