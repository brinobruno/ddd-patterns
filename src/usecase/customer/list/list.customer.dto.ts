// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputListCustomerDto {}

type OutputCustomerDto = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zipCode: string;
    city: string;
  };
};

export interface OutputListCustomerDto {
  customers: OutputCustomerDto[];
}
