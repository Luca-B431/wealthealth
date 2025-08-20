import Table from "~/components/table";
import type { Route } from "./+types/employee-list";
import { useEffect } from "react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div id="employee-div" className="container py-12">
        <h1 className="text-xl font-bold">Current Employees</h1>
        <Table />
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
