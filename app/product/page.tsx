"use client";
import getProductDetail from "../utils/getProductDetail";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/components/Product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Loading from "./loading";

export type ProductDetailType = {
  title: string;
  url: string;
  seller_id: string;
  seller_name: string;
  image: string[];
  price: string;
  original_price: string;
  savings_percentage: number | null;
  savings_price: string;
  product_details: { [key: string]: string };
  about_this_product: string[];
  product_information: {
    PackageDimensions: string;
    Manufacturer: string;
    ASIN: string;
    CountryofOrigin: string;
  };
  product_technical_details: null;
  product_description: null;
  what_in_the_box: null;
  important_information: null;
  is_renewed: boolean;
};

function ProductPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asin = searchParams.get("asin");
        const country = searchParams.get("country");

        if (asin && country) {
          const data = await getProductDetail(asin, country);
          if (data && data.status === "ok" && data.data) {
            setProduct(data.data);
          } else {
            console.error("Empty product data received from the API.");
          }
        } else {
          console.error("ASIN or country parameter is missing.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : product ? (
        <div className="p-4 lg:p-10 flex flex-col lg:flex-row w-full">
          <div className="hidden lg:inline space-y-4">
            {product.image.map((image, i) => (
              <Image
                key={image}
                src={image}
                alt={product.title + " " + i}
                width={90}
                height={90}
                className="border rounded-sm"
              />
            ))}
          </div>
          <Carousel
            opts={{
              loop: true,
            }}
            className="w-3/5 mb-10 lg:mb-0 lg:w-full self-start flex items-center max-w-xl mx-auto lg:mx-20"
          >
            <CarouselContent>
              {product.image.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <div className="flex aspect-square items-center justify-center p-2 relative">
                      <Image
                        key={image}
                        src={image}
                        alt={product.title + " " + i}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="flex-1 border rounded-md w-full p-5 space-y-5">
            <h1 className="text-3xl font-bold">{product.title}</h1>
              
          <p className="text-2xl font-bold mt-2">{product.price}</p>
          </div>
    

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Specification</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(product.product_details).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-bold">{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No product data available.</p>
      )}
    </>
  );
}

export default ProductPage;
