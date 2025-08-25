// import Table from "~/components/table";
import { Table } from "@Luca-B431/wh-table";
import type { Route } from "./+types/employee-list";
import { Link } from "react-router";
import { useEmployees } from "~/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { employees } = useEmployees();
  console.log(employees);

  const columns = [
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
    },
    {
      header: "Date of Birth",
      accessorKey: "dateOfBirth",
    },
    {
      header: "Street",
      accessorKey: "street",
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Zip Code",
      accessorKey: "zipCode",
    },
  ];

  return (
    <>
      <div id="employee-div" className="container py-12">
        <h1 className="text-xl font-bold">Current Employees</h1>
        <Table data={employees} columns={columns} />
        <Link
          to="/"
          className="inline-flex items-center p-4 mb-4 border-1 border-gray-300 rounded-lg shadow-md text-gray-700"
        >
          Home
        </Link>
      </div>
    </>
  );
}
