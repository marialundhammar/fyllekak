import { useTable, useSortBy } from "react-table";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

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
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="text-center border border-yellow-600 w-[10%] px-2"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
