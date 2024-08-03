export type DefaultParams = {
  limit: number;
  offset: number;
};

type Address = {
  address_line_1: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
};

export type Employee = {
  id: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
};

export type GetEmployeeParams = {
  id?: string;
} & DefaultParams;
