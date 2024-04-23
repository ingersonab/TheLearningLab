import React from 'react';
import './Table.css';

function Table({data, header1, header2, header3}) {
    return (
        <div className="table-container">
            <table>
                <tr>
                    <th>{header1}</th>
                    <th>{header2}</th>
                    <th>{header3}</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.student_id}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                        </tr>
                    )
                })}

            </table>
        </div>
    )
}