import axios, { AxiosResponse } from "axios";
import { DefaultParams, Employee, GetEmployeeParams } from "../types/employee";
import { urls } from "../constants/urls";

export const listEmployees: (
  params: DefaultParams
) => Promise<AxiosResponse<Employee[]>> = async (params: GetEmployeeParams) => {
  try {
    const response = await axios.get<Employee[]>(urls.listEmployees, {
      params
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
    const response = await axios.post<Employee>(urls.createEmployee, {
      payload,
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong! Unable to create employee.");
  }
};
