import {Origin } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/origins`;
const getOrigins = async (): Promise<Origin[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getOrigins;