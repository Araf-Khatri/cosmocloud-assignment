import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Employee } from "../../types/employee";
import { useParams } from "react-router-dom";
import { listEmployees } from "../../requests/employees";
import FormInput from "../common/FormInput";

import "./createEditEmployee.css";
import { phoneRegex } from "../../constants";

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

  useEffect(() => {
    if (type === "EDIT") fetchEmployee();
  }, []);

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

  const onChangeHandler =
    (parentKey: keyof Employee | null) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (parentKey === null) {
        setEmployee((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value.replace("  ", " "),
        }));
      } else {
        setEmployee((prevState) => ({
          ...prevState,
          [parentKey]: {
            [e.target.name]: e.target.value,
          },
        }));
      }
    };

  return (
    <div className="wrapper">
      <div className="create-employee">
        <div className="employee-info">
          <FormInput<keyof Employee>
            inputType="text"
            label="Name:"
            name="name"
            onChangeHandler={onChangeHandler(null)}
            value={employee.name}
            placeholder="Enter Name"
          />
          <FormInput<keyof Employee>
            inputType="text"
            label="Phone:"
            name="phone"
            onChangeHandler={onChangeHandler(null)}
            value={employee.phone}
            placeholder="Enter Phone"
            // accept={phoneRegex}
          />
          <FormInput<keyof Employee>
            inputType="email"
            label="Email:"
            name="email"
            onChangeHandler={onChangeHandler(null)}
            value={employee.email}
            placeholder="Enter Email"
          />
        </div>
        <div className="employee-address">
          <p className="heading">Address Details:</p>
          <div className="employee-info">
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="Address Line 1:"
              name="address_line_1"
              onChangeHandler={onChangeHandler("address")}
              value={employee.email}
              placeholder="Enter Address Line 1"
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="City Name:"
              name="city"
              onChangeHandler={onChangeHandler("address")}
              value={employee.address.city}
              placeholder="Enter City Name"
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="Country Name:"
              name="country"
              onChangeHandler={onChangeHandler("address")}
              value={employee.address.country}
              placeholder="Enter Country Name"
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="Zip Code:"
              name="zip_code"
              onChangeHandler={onChangeHandler("address")}
              value={employee.address.zip_code}
              placeholder="Enter Zip Code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditEmployee;
