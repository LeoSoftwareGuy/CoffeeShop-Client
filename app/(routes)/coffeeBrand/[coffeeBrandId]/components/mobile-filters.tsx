"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Intensity, Origin, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  intensities: Intensity[];
  origins: Origin[];
  prices:number[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  intensities,
  origins,
  prices,
}) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filers
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel
            className="relative ml-auto py-4 pb-6 
            flex h-full w-full 
            max-w-xs flex-col 
            overflow-y-auto bg-white shadow-xl"
          >
            {/* Close Button */}
            <div className="px-4 flex items-center justify-end">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            {/*Render filters*/}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="originId" name="Origins" data={origins} />
              <Filter
                valueKey="intensityId"
                name="Intensities"
                data={intensities}
              />
              
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
