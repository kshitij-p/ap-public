"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Input } from "~/components/ui/input";
import { fetch } from "~/lib/fetch";
import { listProductsQueryKey } from "~/lib/queryKeys";
import { Product } from "~/types";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul className="mt-8 grid grid-cols-1 justify-center gap-8 md:mt-14 md:grid-cols-[repeat(2,_minmax(0,_430px))] md:gap-20 lg:grid-cols-[repeat(3,_minmax(0,_430px))] xl:mt-12 xl:gap-28">
      <AnimatePresence>
        {products.map((product) => {
          return (
            <motion.li
              key={product.id}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
            >
              <Link
                className="scale group flex max-h-[30rem] flex-col items-center gap-1 transition duration-300 hover:scale-105 focus:scale-105 focus:outline-none md:max-h-[40rem] md:gap-2"
                href={`/products/${product.id}`}
              >
                <div className="relative aspect-[9/10] w-full scale-100 rounded-sm ">
                  <Image
                    className="h-full w-full object-cover object-center shadow-[0px_0px_0px_0px_#be123c] transition-all duration-300 hover:shadow-[0px_8px_10px_-1px_#be123c] group-focus:shadow-[0px_8px_10px_-1px_#be123c]"
                    src={product.images[0] ?? ""}
                    alt={`An image of ${product.name}`}
                    fill
                  />
                </div>
                <div className="self-start">
                  <h4 className="text-xl font-medium md:text-2xl">
                    {product.name}
                  </h4>
                  <span className="md:text-xl">₹{product.priceInr}</span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

const ProductSearch = ({
  onChange,
  value,
  ...rest
}: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <Input
      {...rest}
      className="mt-8 h-[unset] max-w-4xl md:p-2 md:px-4 md:text-3xl"
      placeholder="Search for a product.."
      value={value}
      onChange={onChange}
    />
  );
};

const ProductSection = () => {
  const { data, isLoading: isLoading } = useQuery({
    queryKey: [listProductsQueryKey()],
    queryFn: async () => {
      const {
        products,
      }: {
        products: Product[];
      } = await fetch.get("/products/list").json();
      return products;
    },
    initialData: [],
    initialDataUpdatedAt: 0,
    staleTime: Infinity,
  });

  const [filter, setFilter] = useState("");

  const filteredProducts = useMemo(() => {
    if (!data || !data.length) return [];

    const query = filter.toLowerCase().trim();
    return data.filter((product) => product.name.toLowerCase().includes(query));
  }, [filter, data]);

  return (
    <section className="mt-2 flex flex-col items-center md:mt-6 lg:mt-8">
      <ProductSearch
        value={filter}
        onChange={(e) => setFilter(e.currentTarget.value)}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin md:h-16 md:w-16" />
        </div>
      )}

      <ProductList products={filteredProducts} />
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center pt-8">
        <h2 className="text-center text-4xl lg:text-6xl">
          <b>Ecommerce Example</b>
        </h2>
      </div>
      <ProductSection />
    </div>
  );
}
