export type DefaultParams = {
  limit: number;
  offset: number;
}

type Address = {
  address_line_1: string;
  city: string;
  country: string;
  zip_code: string;
};

export type Employee = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
};

export type GetEmployeeParams = {
  id?: string
} & DefaultParams