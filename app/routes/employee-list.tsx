import Table from "~/components/table";
import type { Route } from "./+types/employee-list";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <Table />
        <a href="/">Home</a>
      </div>
    </>
  );
}
