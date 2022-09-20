import React from 'react'
// import useRestaurants from '../hooks/useRestaurants'

const Table = ({ restaurants }) => {
    console.log("restaurants ==>", restaurants)

    return (
        <table>
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Adress</th>
                    <th>Ort</th>
                    <th>Beskrivning</th>
                    <th>Hemsida</th>
                    <th>Telefon</th>
                    <th>Epost</th>
                    <th>Facebook</th>
                    <th>Instagram</th>
                    <th>Vego</th>
                </tr>
            </thead>
            <tbody>

                {restaurants.data && restaurants.data.map(res => (
                    <tr key={res.id}>
                        <td>{res.namn}</td>
                        <td>{res.adress}</td>
                        <td>{res.ort}</td>
                        <td>{res.beskrivning}</td>
                        <td>{res.hemsida}</td>
                        <td>{res.telefon}</td>
                        <td>{res.epost}</td>
                        <td>{res.facebook}</td>
                        <td>{res.instagram}</td>
                        <td>{res.vego}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table