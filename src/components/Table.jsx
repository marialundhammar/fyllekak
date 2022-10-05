import { useTable, useSortBy } from "react-table";
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Table = ({ collection, columns, data }) => {
	const navigate = useNavigate()

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy);

	const handleRowClick = (collection, row) => {
		navigate(`/edit/${collection}/${row.original.id}`)
	}

	return (
		<table className="w-4/5 bg-yellow-200">
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
								className="text-center border border-yellow-600 w-[10%] bg-yellow-400"
							>
								{column.render("Header")}
								<span>
									{column.isSorted
										? column.isSortedDesc
											? " ⬇️"
											: " ⬆️"
										: ""}
								</span>
							</th>
						))}
						<th className="text-center border border-yellow-600 w-[10%] bg-yellow-400">Ta bort</th>
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)

					return (
						<tr {...row.getRowProps()}
							onClick={() => handleRowClick(collection, row)}
						>
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()} className="text-center border border-yellow-600 w-[10%] px-2"
								>
									{cell.render("Cell")}
								</td>
							))}
							<td className="text-center border border-yellow-600 w-[10%] px-2">❌</td>
						</tr>
					);
				})}
			</tbody>
		</table >
	);
};

export default Table;
