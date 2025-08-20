import type { Route } from "./+types/home";
import { useEffect } from "react";
import { Link } from "react-router";
import Selector from "~/components/selector";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    $(function () {
      $("#date-of-birth").datetimepicker({
        timepicker: false,
        format: "m/d/Y",
      });
      $("#start-date").datetimepicker({
        timepicker: false,
        format: "m/d/Y",
      });
    });
  }, []);

  function saveEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const firstName = values["first-name"] as string;
    const lastName = values["last-name"] as string;
    const dateOfBirth = values["date-of-birth"] as string;
    const startDate = values["start-date"] as string;
    const street = values["street"] as string;
    const city = values["city"] as string;
    const state = values["state"] as string;
    const zipCode = values["zip-code"] as string;
    const department = values["department"] as string;

    const employeesData = localStorage.getItem("employees");
    const employees = employeesData ? JSON.parse(employeesData) : [];
    const employee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      department: department,
    };
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    $("#confirmation").modal();
  }

  return (
    <>
      <div className="title py-4">
        <h1 className="text-4xl font-bold">HRnet</h1>
      </div>
      <div className="container">
        <Link
          to="employee-list"
          className="inline-flex items-center p-4 mb-4 border-1 border-gray-300 rounded-lg shadow-md text-gray-700"
        >
          View Current Employees
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="ml-2"
          >
            <path
              fill="#888f9aff"
              fill-rule="evenodd"
              d="M4.998 7.78C6.729 6.345 9.198 5 12 5s5.27 1.345 7.002 2.78a12.7 12.7 0 0 1 2.096 2.183c.253.344.465.682.618.997c.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997a12.7 12.7 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19s-5.27-1.345-7.002-2.78a12.7 12.7 0 0 1-2.096-2.183a6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.7 12.7 0 0 1 4.998 7.78M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
              clip-rule="evenodd"
            />
          </svg>
        </Link>

        <form
          action="#"
          id="create-employee"
          onSubmit={saveEmployee}
          className="border-1 p-8 rounded-2xl shadow-md  border-gray-300"
        >
          <h2 className="text-xl font-bold ml-18">Create Employee</h2>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" name="date-of-birth" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" name="start-date" />

          <fieldset className="address">
            <legend className="text-lg font-bold">Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" />

            <Selector labelName="state" department="state" />

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" name="zip-code" />
          </fieldset>

          <Selector labelName="department" department="department" />

          <button
            type="submit"
            className="ml-4 bg-black text-white py-2 px-4 rounded"
          >
            {" "}
            Save
          </button>
        </form>
      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </>
  );
}
