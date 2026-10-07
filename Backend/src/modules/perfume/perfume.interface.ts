export interface IPerfume {
  name: string;
  brand: string;
  category: string;

  shortDescription: string;
  description: string;

  image: string;

  price: number;

  stock: number;

  createdBy?: string;
}
