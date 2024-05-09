import {Intensity } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/intensities`;
const getIntensities = async (): Promise<Intensity[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getIntensities;