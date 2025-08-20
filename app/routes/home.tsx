import states from "~/data/states";
import type { Route } from "./+types/home";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    $(function () {
      const stateSelect = document.getElementById("state");
      states.forEach(function (state) {
        const option = document.createElement("option");
        option.value = state.abbreviation;
        option.text = state.name;
        stateSelect?.appendChild(option);
      });

      $("#department").selectmenu();
      $("#state").selectmenu();

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
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <a href="employee-list">View Current Employees</a>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" onSubmit={saveEmployee}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" name="date-of-birth" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" name="start-date" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" />

            <label htmlFor="state">State</label>
            <select id="state" name="state"></select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" name="zip-code" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>

          <button type="submit"> Save</button>
        </form>
      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </>
  );
}
