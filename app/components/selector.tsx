import * as React from "react";
import states from "~/data/states";
import departments from "~/data/departements";

export default function Selector({
  labelName,
}: {
  labelName: string;
  department: string;
}) {
  React.useEffect(() => {
    $(function () {
      if (labelName === "state") {
        const stateSelect = document.getElementById("state");
        states.forEach(function (state) {
          const option = document.createElement("option");
          option.value = state.abbreviation;
          option.text = state.name;
          stateSelect?.appendChild(option);
        });
        $("#state").selectmenu();
      } else if (labelName === "department") {
      }
      const departmentSelect = document.getElementById("department");
      if (departmentSelect) {
        departmentSelect.innerHTML = "";
        departments.forEach(function (department: { department: string }) {
          const option = document.createElement("option");
          option.value = department.department;
          option.text = department.department;
          departmentSelect.appendChild(option);
        });
      }

      $("#department").selectmenu();
    });
  }, []);

  return (
    <>
      <label htmlFor={labelName}>
        {labelName === "state" ? "State" : "Department"}
      </label>
      <select id={labelName} name={labelName}></select>
    </>
  );
}
