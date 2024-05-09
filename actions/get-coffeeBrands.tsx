import {CoffeeBrand } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/coffeeBrands`;
const getCoffeBrands = async (): Promise<CoffeeBrand[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getCoffeBrands;