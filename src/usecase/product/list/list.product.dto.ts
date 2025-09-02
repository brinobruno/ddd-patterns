// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListProductInputDto {}

type OutputProductDto = {
  id: string;
  name: string;
  price: number;
};

export interface ListProductOutputDto {
  products: OutputProductDto[];
}
