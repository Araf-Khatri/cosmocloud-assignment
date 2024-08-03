import { FC, useEffect, useRef, useState } from "react";
import { Employee } from "../../types/employee";
import { useParams } from "react-router-dom";
import { listEmployees } from "../../requests/employees";

type CreateEditEmployeeProps = {
  type: "EDIT" | "CREATE";
};

const initialData: Employee = {
  id: null,
  name: null,
  email: null,
  phone: null,
  address: {
    address_line_1: null,
    city: null,
    country: null,
    zip_code: null,
  },
};
const CreateEditEmployee: FC<CreateEditEmployeeProps> = ({ type }) => {
  const params = useParams();
  const [employee, setEmployee] = useState<Employee>(initialData);
  const employeeAPIRef = useRef<AbortController | null>(null);

  const fetchEmployee = async () => {
    if (employeeAPIRef.current) employeeAPIRef.current.abort();
    try {
      const id = params.id;
      if (!id) throw new Error("ID not found!");
      const controller = new AbortController();
      employeeAPIRef.current = controller;

      const response = await listEmployees(
        { id, limit: 1, offset: 0 },
        controller.signal
      );
      const employee = response.data;
      if (employee.length == 0)
        throw new Error("Employee not found! Invalid ID!");

      setEmployee(employee[0]);
      // show success toast
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (type === "EDIT") fetchEmployee();
  }, []);
  return <></>;
};

export default CreateEditEmployee;
