"use client";
import React, { useEffect, useState } from "react";
import { getProductData } from "../utils/getProductData";
import Product, { ProductType } from "@/components/Product";
import Loading from "./loading";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

function SearchPage({ searchParams: { q } }: SearchProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchDataAndSetProducts() {
      try {
        setLoading(true); // Start loading
        const result = await getProductData(q);
        console.log("Data fetched:", result);
        setProducts(result.data); // Assuming result is an object with a 'data' array
        setLoading(false); // Finish loading
      } catch (error) {
        setLoading(false); // Finish loading on error too
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndSetProducts();
  }, [q]);
  return (
    <div className="p-10">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-2">Results for {q}</h1>
          <h2 className="mb-5 text-gray-400">({products?.length} results)</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products?.map((product, index) => (
              <li key={index}>
                <Product product={product} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
