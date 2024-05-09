"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-card";
import { MouseEventHandler, useEffect, useState } from "react";
import IntensityStars from "./intensity-starts";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data, amount);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Origin:</h3>
          <div>{data?.origin?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Intensity:</h3>
          <IntensityStars intensity={data.intensity.value} />
        </div>
        <div className="flex items-center gap-x-4">
          {data?.stock > 0 ? (
            <>
              <h3 className="font-semibold text-black">In stock:</h3>
              <div>{data?.stock}</div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-black">Out of Stock</h3>
            </>
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Amount:</h3>
          <input
            className="flex 
          h-10 
          w-full 
          rounded-md 
          border
           border-input 
           bg-background 
           px-3 
           py-2 
           text-sm ring-offset-background
          file:border-0 file:bg-transparent
          file:text-sm file:font-medium 
          placeholder:text-muted-foreground
          focus-visible:outline-none
           focus-visible:ring-2 
          focus-visible:ring-ring 
          focus-visible:ring-offset-2 
          disabled:cursor-not-allowed 
          disabled:opacity-50"
            type="number"
            placeholder="1"
            value={amount}
            onChange={(evt) => setAmount(parseInt(evt.target.value))}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2"
          disabled={amount > data?.stock}
          onClick={onAddToCart}
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
