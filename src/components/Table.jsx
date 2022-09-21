import { useTable } from 'react-table'

const Table = ({ columns, data }) => {
    const tableInstance = useTable({ columns, data })

    const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

    return (
        // <table className="w-4/5">
        //     <thead>
        //         <tr>
        //             <th className="text-center border border-black w-[10%]">Namn</th>
        //             <th className="text-center border border-black w-[10%]">Adress</th>
        //             <th className="text-center border border-black w-[10%]">Ort</th>
        //             <th className="text-center border border-black w-[10%]">Beskrivning</th>
        //             <th className="text-center border border-black w-[10%]">Hemsida</th>
        //             <th className="text-center border border-black w-[8%]">Telefon</th>
        //             <th className="text-center border border-black w-[14%]">Epost</th>
        //             <th className="text-center border border-black w-[8%]">Facebook</th>
        //             <th className="text-center border border-black w-[10%]">Instagram</th>
        //             <th className="text-center border border-black w-[10%]">Vego</th>
        //         </tr>
        //     </thead>
        //     <tbody>

        //         {restaurants.data && restaurants.data.map(res => (
        //             <tr key={res.id}>
        //                 <td className="text-center border border-black w-[10%]">{res.namn}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.adress}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.ort}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.beskrivning}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.hemsida}</td>
        //                 <td className="text-center border border-black w-[8%]">{res.telefon}</td>
        //                 <td className="text-center border border-black w-[14%]">{res.epost}</td>
        //                 <td className="text-center border border-black w-[8%]">{res.facebook}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.instagram}</td>
        //                 <td className="text-center border border-black w-[10%]">{res.vego}</td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>

        // <table {...getTableProps()} >
        //     <thead>
        //         {headerGroups.map(headerGroup => (
        //             <tr {...headerGroup.getHeaderGroupProps()}>
        //                 {headerGroup.headers.map(column => (
        //                     <th {...column.getHeaderProps()}>
        //                         {column.render('Header')}
        //                     </th>
        //                 ))}
        //             </tr>
        //         ))}
        //     </thead>
        //     <tbody {...getTableBodyProps()}>
        //         {rows.map((row, i) => {
        //             prepareRow(row)
        //             return (
        //                 <tr {...row.getRowProps()}>
        //                     {row.cells.map(cell => (
        //                         <td {...cell.getCellProps()}>
        //                             {cell.render('Cell')}
        //                         </td>
        //                     ))}
        //                 </tr>
        //             )
        //         })}
        //     </tbody>
        // </table>

        <table hover {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table