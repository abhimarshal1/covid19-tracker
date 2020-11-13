import React from 'react'
import './Table.css'
import numeral from 'numeral'

const Table = ({ countries }) => {
    return (
        <div className="table">
            {
                countries.map(({ name, cases }) => (
                    <tr key={`${name}-${cases}`}>
                        <td>{name}</td>
                        <td><strong>{numeral(cases).format("0,0")}</strong></td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
