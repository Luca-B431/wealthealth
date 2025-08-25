import type { Route } from "./+types/home";
import { Link } from "react-router";
import Select from "~/components/select";
import states from "~/data/states";
import departments from "~/data/departements";
import Datetimepicker from "~/components/datetimepicker";
import { useModal } from "~/components/modal";
import { useEmployees } from "~/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { employees, addEmployee } = useEmployees();

  const confirmationModal = useModal({
    id: "confirmation",
    children: <>Employee created !</>,
  });

  function saveEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const employee = {
      firstName: values["first-name"] as string,
      lastName: values["last-name"] as string,
      dateOfBirth: values["date-of-birth"] as string,
      startDate: values["start-date"] as string,
      street: values["street"] as string,
      city: values["city"] as string,
      state: values["state"] as string,
      zipCode: values["zip-code"] as string,
      department: values["department"] as string,
    };

    addEmployee(employee);
    console.log(employees);
    confirmationModal.open();
    form.reset();
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
              fillRule="evenodd"
              d="M4.998 7.78C6.729 6.345 9.198 5 12 5s5.27 1.345 7.002 2.78a12.7 12.7 0 0 1 2.096 2.183c.253.344.465.682.618.997c.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997a12.7 12.7 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19s-5.27-1.345-7.002-2.78a12.7 12.7 0 0 1-2.096-2.183a6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.7 12.7 0 0 1 4.998 7.78M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <form
          id="create-employee"
          onSubmit={saveEmployee}
          className="border-1 p-8 rounded-2xl shadow-md border-gray-300"
        >
          <h2 className="text-xl font-bold ml-18">Create Employee</h2>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />

          <Datetimepicker label="Date of Birth" name="date-of-birth" />
          <Datetimepicker label="Start Date" name="start-date" />

          <fieldset className="address">
            <legend className="text-lg font-bold">Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" />

            <Select label="State" name="state">
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </Select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" name="zip-code" />
          </fieldset>

          <Select label="Department" name="department">
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>

          <button
            type="submit"
            className="ml-4 bg-black text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
      {confirmationModal.node}
    </>
  );
}
