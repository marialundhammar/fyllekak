import { useTable, useSortBy } from "react-table";
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Table = ({ columns, data }) => {
	const navigate = useNavigate()

	useEffect(() => {
		console.log("data:", data)
	}, [])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy);

	const handleRowClick = (row) => {
		// console.log(row.original.id)
		navigate(`/edit/${row.original.id}`)
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
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)

					return (
						<tr {...row.getRowProps()}
							onClick={() => handleRowClick(row, row.id)}
						>
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()} className="text-center border border-yellow-600 w-[10%] px-2"
								>
									{cell.render("Cell")}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table >
	);
};

export default Table;
