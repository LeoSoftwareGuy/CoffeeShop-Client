"use client";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-card";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const router = useRouter();
  if (!isMounted) {
    return null;
  }

  const productsAmount = cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {productsAmount}
        </span>
      </Button>
    </div>
  );
};

export default NavBarActions;
