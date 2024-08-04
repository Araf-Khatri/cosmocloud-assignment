import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Employee } from "../../types/employee";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
} from "../../requests/employees";
import FormInput from "../common/FormInput";

import "./createEditEmployee.css";
import { emailRegex, phoneRegex } from "../../constants";

type CreateEditEmployeeProps = {
  type: "VIEW" | "CREATE";
};

const initialData: Employee = {
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
  const navigate = useNavigate();
  const params = useParams();
  const [employee, setEmployee] = useState<Employee>(initialData);
  const employeeAPIRef = useRef<AbortController | null>(null);
  const enableCreateCTA =
    ((employee.email && emailRegex.test(employee.email)) ||
      (employee.phone && phoneRegex.test(employee.phone))) &&
    employee.name;

  useEffect(() => {
    if (type === "VIEW") fetchEmployee();
    else setEmployee({ ...initialData });
  }, [type]);

  const fetchEmployee = async () => {
    if (employeeAPIRef.current) employeeAPIRef.current.abort();
    try {
      const id = params.id;
      if (!id) throw new Error("ID not found!");
      const controller = new AbortController();
      employeeAPIRef.current = controller;

      const response = await getEmployee(id, controller.signal);
      const employee = response.data;
      if (!employee) throw new Error("Employee not found! Invalid ID!");

      setEmployee(employee);
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
          address: {
            ...prevState.address,
            [e.target.name]: e.target.value,
          },
        }));
      }
    };

  const createEmployeeHandler = async () => {
    try {
      await createEmployee(employee);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const isViewProfileFlow = type === "VIEW";

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
            disable={isViewProfileFlow}
          />
          <FormInput<keyof Employee>
            inputType="text"
            label="Phone:"
            name="phone"
            onChangeHandler={(e) => {
              const value = e.target.value;
              if (Number.isNaN(+value) || value.length > 10) return;
              onChangeHandler(null)(e);
            }}
            value={employee.phone}
            placeholder="Enter Phone"
            disable={isViewProfileFlow}
          />
          <FormInput<keyof Employee>
            inputType="email"
            label="Email:"
            name="email"
            onChangeHandler={onChangeHandler(null)}
            value={employee.email}
            placeholder="Enter Email"
            disable={isViewProfileFlow}
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
              value={employee.address.address_line_1}
              placeholder="Enter Address Line 1"
              disable={isViewProfileFlow}
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="City Name:"
              name="city"
              onChangeHandler={onChangeHandler("address")}
              value={employee.address.city}
              placeholder="Enter City Name"
              disable={isViewProfileFlow}
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="Country Name:"
              name="country"
              onChangeHandler={onChangeHandler("address")}
              value={employee.address.country}
              placeholder="Enter Country Name"
              disable={isViewProfileFlow}
            />
            <FormInput<keyof Employee["address"]>
              inputType="text"
              label="Zip Code:"
              name="zip_code"
              onChangeHandler={(e) => {
                const value = e.target.value;
                if (Number.isNaN(+value)) return;
                onChangeHandler("address")(e);
              }}
              value={employee.address.zip_code}
              placeholder="Enter Zip Code"
              disable={isViewProfileFlow}
            />
          </div>
        </div>
      </div>
      {type === "CREATE" && (
        <button
          onClick={createEmployeeHandler}
          disabled={!enableCreateCTA}
          className="create-employee-btn"
        >
          Create Employee
        </button>
      )}
    </div>
  );
};

export default CreateEditEmployee;
