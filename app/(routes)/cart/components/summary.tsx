"use client";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-card";
import toast from "react-hot-toast";
import { Product } from "@/types";

// When checkout button is clicked, we post ids of products to be purchased to the API,
// in case of successful purchase , we get success from the API and we insert it into the window.location (URL?)
// in case of not successful purchase, we get cancel

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment was cancelled");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    const productsAndQuantity: Record<string, number> = items.reduce(
      (acc: Record<string, number>, item: Product) => {
        acc[item.id] = item.quantity;
        return acc;
      },
      {}
    );
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productsAndQuantity,
        }
      );

      window.location = response.data.url;
    } catch (error: any) {
      toast.error("Insufficent stock!");
    }
  };

  return (
    <div
      className="mt-16 px-4 py-6 rounded-lg bg-gray-50 
    sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 "
    >
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="pt-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        className="w-full mt-6"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
