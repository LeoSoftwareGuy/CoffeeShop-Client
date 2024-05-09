import { Product } from "@/types";
import qs from "query-string";

interface Query {
  coffeeBrandId?: string;
  intensityId?: string;
  sizeId?: string;
  originId?:string;
  isFeatured?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      coffeeBrandId: query.coffeeBrandId,
      intensityId:query.intensityId,
      sizeId: query.sizeId,
      originId: query.originId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url);
  return res.json();
};

export default getProducts;
