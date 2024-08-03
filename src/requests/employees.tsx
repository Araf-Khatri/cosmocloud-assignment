import axios, { AxiosResponse } from "axios";
import { DefaultParams, Employee, GetEmployeeParams } from "../types/employee";
import { urls } from "../constants/urls";

// Function is used to fetch a single employee record for edit flow.
export const listEmployees: (
  params: DefaultParams
) => Promise<AxiosResponse<Employee[]>> = async (params: GetEmployeeParams) => {
  try {
    const response = await axios.get<Employee[]>(urls.employees, {
      params,
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
    const response = await axios.post<Employee>(urls.employees, {
      payload,
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong! Unable to create employee.");
  }
};

export const deleteEmployee = async ({ id }: { id: number }) => {
  try {
    const deleteEmployeeAPI = `${urls.employees}/${id}`;
    const response = await axios.delete(deleteEmployeeAPI);

    return response;
  } catch (err) {
    throw new Error("Something went wrong! Cannot delete Employee.");
  }
};

export const updateEmployee = async (data: Employee) => {
  try {
    const updateEmployeeAPI = `${urls.employees}/${data.id}`;
    const response = await axios.put(updateEmployeeAPI, data);
    
    return response;
  } catch (err) {
    throw new Error("Something went wrong! cannot update Employee.");
  }
};
