import React from 'react'
// import useRestaurants from '../hooks/useRestaurants'

const Table = ({ restaurants }) => {
    console.log("restaurants ==>", restaurants)

    return (
        <table className="w-3/4">
            <thead>
                <tr>
                    <th className="text-center border border-black">Namn</th>
                    <th className="text-center border border-black">Adress</th>
                    <th className="text-center border border-black">Ort</th>
                    <th className="text-center border border-black">Beskrivning</th>
                    <th className="text-center border border-black">Hemsida</th>
                    <th className="text-center border border-black">Telefon</th>
                    <th className="text-center border border-black">Epost</th>
                    <th className="text-center border border-black">Facebook</th>
                    <th className="text-center border border-black">Instagram</th>
                    <th className="text-center border border-black">Vego</th>
                </tr>
            </thead>
            <tbody>

                {restaurants.data && restaurants.data.map(res => (
                    <tr key={res.id}>
                        <td className="text-center border border-black">{res.namn}</td>
                        <td className="text-center border border-black">{res.adress}</td>
                        <td className="text-center border border-black">{res.ort}</td>
                        <td className="text-center border border-black">{res.beskrivning}</td>
                        <td className="text-center border border-black">{res.hemsida}</td>
                        <td className="text-center border border-black">{res.telefon}</td>
                        <td className="text-center border border-black">{res.epost}</td>
                        <td className="text-center border border-black">{res.facebook}</td>
                        <td className="text-center border border-black">{res.instagram}</td>
                        <td className="text-center border border-black">{res.vego}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table