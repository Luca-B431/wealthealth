// employees-context.tsx
import { createContext, useContext, useState } from "react";
import type { Employee } from "./types/person";

type EmployeesContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
};

const EmployeesContext = createContext<EmployeesContextType | undefined>(
  undefined
);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  function addEmployee(employee: Employee) {
    setEmployees((prev) => [...prev, employee]);
  }

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeesProvider");
  }
  return context;
}
