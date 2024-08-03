import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/employee";
import { deleteEmployee, listEmployees } from "../../requests/employees";

import "./index.css";

const Employees: FC = () => {
  const navigate = useNavigate();
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
    // fetchEmployees();
    return () => {
      employeesAPIRef?.current?.abort();
    };
  }, []);

  const editEmployeeHandler = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const deleteEmployeeHandler = async (id: number) => {
    try {
      await deleteEmployee({ id });
      await fetchEmployees();
    } catch (err) {
      console.error("Something went wrong!");
    }
  };

  return (
    <div className="wrapper">
      <div className="employees">
        {employees.map(({ id, name }) => (
          <div className="card">
            <div className="card-content">
              <div className="card-info">
                <div className="card-id-badge">{`ID: ${id}`}</div>
                <span className="card-name">{name}</span>
              </div>
              <div className="card-cta">
                <button
                  onClick={() => editEmployeeHandler(id!)}
                  className="cta-button edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployeeHandler(id!)}
                  className="cta-button delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
