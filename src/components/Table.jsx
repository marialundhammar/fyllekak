import { useTable, useSortBy } from "react-table";
import { useNavigate } from "react-router-dom";

const Table = ({ collection, columns, data }) => {
	const navigate = useNavigate()

	const {
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy);

	const handleRowClick = (collection, row) => {
		navigate(`/edit/${collection}/${row.original.id}`)
	}

	return (
		<table className="w-4/5 bg-darkish-blue">
			{/* Table Heading */}
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
								className="text-center text-darkish-blue border border-contrast-color w-[10%] bg-contrast-color"
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

			{/* Table Body */}
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)

					return (
						<tr {...row.getRowProps()}
							onClick={() => {
								if (collection != 'admin') {
									handleRowClick(collection, row)
								}
							}}
							className={
								collection != 'admin'
									? "hover:text-contrast-color-dark cursor-pointer"
									: ""
							}>
							{row.cells.map((cell) => {
								return (
									cell.column.Header == "Profilbild"
										? <td {...cell.getCellProps()} className="text-center border border-contrast-color w-1/6">
											<div className="w-20 h-20 flex justify-center items-center">
												<img
													src={cell.row.original.img}
													alt='Profilbild'
												/>
											</div>
										</td>
										: < td {...cell.getCellProps()} className="text-center border border-contrast-color p-2 w-1/6" >
											{cell.render("Cell")}
										</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table >
	);
};

export default Table;

