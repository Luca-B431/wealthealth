import * as React from "react";
import type { Person } from "../types/person";
import type { SortingState } from "@tanstack/react-table";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        First Name{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Last Name{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("department", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Department{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("startDate", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Start Date{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateOfBirth", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Date of Birth{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("street", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Street{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        City{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("zipCode", {
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1"
      >
        Zip Code{" "}
        {{
          asc: "▲",
          desc: "▼",
        }[column.getIsSorted() as string] ?? "⇅"}
      </button>
    ),
    cell: (info) => info.getValue(),
  }),
];

export default function Table() {
  const [data, setData] = React.useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Accès au LS côté client, évite l'erreur SSR
  React.useEffect(() => {
    const employeesData = localStorage.getItem("employees");
    if (employeesData) {
      try {
        setData(JSON.parse(employeesData));
      } catch {
        setData([]);
      }
    }
  }, []);

  return (
    <div className="p-2">
      <table className="display dataTable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
