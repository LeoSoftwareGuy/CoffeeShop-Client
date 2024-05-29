"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import qs from "query-string";

interface SliderProps {
  valueKey: string;
  min: number;
  max: number;
}

const Slider: React.FC<SliderProps> = ({ valueKey, min, max }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState(
    searchParams.get(valueKey) ? Number(searchParams.get(valueKey)) : max
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const handleMouseUp = () => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: value,
    };

    if (current[valueKey] && current[valueKey] === String(value)) {
      delete query[valueKey];
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.pathname,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">Price:</h3>
      <div className=" mt-2 flex flex-col items-center">
        <input
          type="range"
          step="1"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="w-full
           h-[1px] 
           appearance-none 
           bg-lime-300
           outline-none
           opacity-70
           transition
           group-hover:opacity-100
          "
        />
        <div className=" mt-5 flex">${value}</div>
      </div>
    </div>
  );
};

export default Slider;
