// src/app/[coffeeBrandId]/page.tsx
import React from 'react';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import Filter from './components/filter';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import MobileFilters from './components/mobile-filters';
import getCoffeBrand from '@/actions/get-coffeeBrand';
import getOrigins from '@/actions/get-origins';
import getIntensities from '@/actions/get-intensities';
import Slider from './components/slider';


export const revalidate = 0;

interface CoffeeBrandPageProps {
  params: {
    coffeeBrandId: string;
  };
  searchParams: {
    intensityId: string;
    originId: string;
    sizeId: string;
    price: string;
  };
}

const CoffeeBrandPage: React.FC<CoffeeBrandPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    coffeeBrandId: params.coffeeBrandId,
    intensityId: searchParams.intensityId,
    originId: searchParams.originId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const origins = await getOrigins();
  const intensities = await getIntensities();
  const coffeeBrand = await getCoffeBrand(params.coffeeBrandId);

  const allPrices = products.map((p) => parseFloat(p.price));
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const selectedPrice = searchParams.price ? parseFloat(searchParams.price) : maxPrice;

  const filteredProducts = products.filter((p) => parseFloat(p.price) <= selectedPrice);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={coffeeBrand.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters
              sizes={sizes}
              origins={origins}
              intensities={intensities}
              prices={allPrices}
            />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="originId" name="Origins" data={origins} />
              <Filter
                valueKey="intensityId"
                name="Intensities"
                data={intensities}
              />
              <Slider
                valueKey="price"
                min={minPrice}
                max={maxPrice}
              />
            </div>

            {/* Products rendered based on filters */}
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {filteredProducts.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CoffeeBrandPage;
