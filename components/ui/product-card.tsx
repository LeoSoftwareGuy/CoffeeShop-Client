"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-card";

interface ProductCardProps {
  data: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  // it overrides handleClick of the div
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data, amount);
  };

  return (
    <div
      onClick={handleClick}
      className="p-3 space-y-4 rounded-xl group cursor-pointer bg-white"
    >
      {/* Images and Actions */}
      <div className="relative aspect-square rounded-xl bg-gray-100 ">
        <Image
          src={data?.images?.[0].url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div
          className="
         opacity-0
         group-hover:opacity-100 
         absolute 
         w-full
         px-6 
         bottom-5
         transition"
        >
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            {!data.isArchieved && (
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.coffeeBrand?.name}</p>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
