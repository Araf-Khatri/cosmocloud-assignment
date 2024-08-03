import { FC, useEffect, useRef, useState } from "react";
import { Employee } from "../../types/employee";
import { listEmployees } from "../../requests/employees";

const Employees: FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const employeesAPIRef = useRef<AbortController | null>(null);

  const fetchEmployees = async () => {
    if (employeesAPIRef.current) employeesAPIRef.current.abort();
    try {
      const controller = new AbortController();
      employeesAPIRef.current = controller;

      const response = await listEmployees(
        { limit: 2, offset: 0 },
        controller.signal
      );
      const employees = response.data;
      setEmployees(employees);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees()
    return () => {
      employeesAPIRef?.current?.abort();
    };
  }, []);

  return (
    <div className="employees">
      <div className="card">
        <div className="flex gap-4">
          <div className="badge">
            <p>ID</p>
          </div>
          <p>NAME</p>
        </div>
        <div className="card buttons">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Employees;
