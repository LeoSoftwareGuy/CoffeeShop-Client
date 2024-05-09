export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface CoffeeBrand {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  coffeeBrand: CoffeeBrand;
  name: string;
  price: string;
  stock: number;
  quantity:number;
  isFeatured: boolean;
  size: Size;
  origin:Origin;
  intensity: Intensity;
  images: Image[];
  isArchieved:boolean;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Origin {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Intensity {
  id:string;
  name:string;
  value:number;
}