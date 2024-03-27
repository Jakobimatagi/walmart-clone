import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export type ProductType = {
  rating: any;
  asin: string;
  bought_in_past_month: null | boolean;
  image: string;
  is_best_seller: boolean;
  is_climate_pledge_friendly: boolean;
  is_limited_time_deal: boolean;
  is_prime: boolean;
  is_sponsored: boolean;
  original_price: string;
  price: string;
  rating_count: number;
  stars: number;
  title: string;
  url: string;
}

function Product({ product }: { product: ProductType }) {
  return (
    <Link
      href={{
        pathname: "/product",
        query: { asin: product.asin, country: "US"},
      }}
      className="flex flex-col relative border rounded-md h-full p-5"
    >
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto"
      />

      <p className="text-xl font-bold">
        {product.price}
      </p>

      {product.is_best_seller && (
        <Badge className="w-fit absolute top-2 right-2">Best seller</Badge>
      )}

      <p className="font-light">{product.title}</p> 

      {product.rating_count && (
        <p className="text-yellow-500 text-sm ">
          {product.stars}★
          <span className="text-gray-400 ml-2">({product.rating_count})</span>
        </p>
      )}
    </Link>
  );
}

export default Product;
