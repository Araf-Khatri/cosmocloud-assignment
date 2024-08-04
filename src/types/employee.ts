export type DefaultParams = {
  limit?: number;
  offset?: number;
};

type Address = {
  address_line_1: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
};

export type Employee = {
  _id?: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
};

export type GetEmployeeParams = {} & DefaultParams;

export type EmployeesListResponse = {
  data: Employee[];
  page: { total: number };
};
