import axios, { AxiosResponse } from "axios";
import {
  Employee,
  EmployeesListResponse,
  GetEmployeeParams,
} from "../types/employee";
import { urls } from "../constants/urls";
import { defaultHeaders } from "./../constants/requestsHeaders";

// Function is used to fetch a single employee record for edit flow.
export const listEmployees: (
  params: GetEmployeeParams,
  signal: AbortSignal
) => Promise<AxiosResponse<EmployeesListResponse>> = async (params, signal) => {
  try {
    const response = await axios.get<EmployeesListResponse>(urls.employees, {
      params,
      signal,
      headers: {
        ...defaultHeaders,
      },
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong! Cannot fetch Employees");
  }
};

export const getEmployee: (
  id: string,
  signal: AbortSignal
) => Promise<AxiosResponse<Employee>> = async (
  id: string,
  signal: AbortSignal
) => {
  try {
    const response = await axios.get<Employee>(`${urls.employees}/${id}`, {
      signal,
      headers: {
        ...defaultHeaders,
      },
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong! Cannot fetch Employees");
  }
};

export const createEmployee: (
  payload: Employee
) => Promise<AxiosResponse<Employee>> = async (payload: Employee) => {
  try {
    const response = await axios.post<Employee>(urls.employees, payload, {
      headers: {
        ...defaultHeaders,
      },
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong! Unable to create employee.");
  }
};

export const deleteEmployee = async ({ _id }: { _id: string }) => {
  try {
    const deleteEmployeeAPI = `${urls.employees}/${_id}`;
    const response = await axios.delete(deleteEmployeeAPI, {
      headers: {
        ...defaultHeaders,
      },
    });

    return response;
  } catch (err) {
    throw new Error("Something went wrong! Cannot delete Employee.");
  }
};

export const updateEmployee = async (data: Employee) => {
  try {
    const updateEmployeeAPI = `${urls.employees}/${data._id}`;
    const response = await axios.put(updateEmployeeAPI, data, {
      headers: {
        ...defaultHeaders,
      },
    });

    return response;
  } catch (err) {
    throw new Error("Something went wrong! cannot update Employee.");
  }
};
