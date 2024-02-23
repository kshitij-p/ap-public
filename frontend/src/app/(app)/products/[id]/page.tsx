"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

import { useForm } from "~/hooks/useForm";
import { fetch } from "~/lib/fetch";
import { getProductQueryKey } from "~/lib/queryKeys";
import { getHostUrl } from "~/lib/utils";
import { Payment, PaymentProvider, Product } from "~/types";

const buyProductFormSchema = z.object({
  quantity: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().nonnegative().max(10)),
});

type CreatePaymentBody = {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  successUrl: string;
  provider: PaymentProvider;
};

const BuyProductForm = ({
  loading,
  product,
}: {
  loading: boolean;
  isLoadingProduct: boolean;
  product: Product | undefined;
}) => {
  const router = useRouter();

  const form = useForm(buyProductFormSchema, {
    defaultValues: {},
  });

  const { mutateAsync: buyProduct, isPending: isBuying } = useMutation({
    mutationFn: async (data: CreatePaymentBody) => {
      const {
        payment,
      }: {
        payment: Payment;
      } = await fetch
        .post("/payments/create", {
          json: data,
        })
        .json();

      return {
        ...payment,
        createdAt: payment.createdAt ? new Date(payment.createdAt) : null,
        expiresAt: payment.expiresAt ? new Date(payment.expiresAt) : null,
      };
    },
    onSuccess: ({ checkoutUrl }) => {
      if (!checkoutUrl) {
        alert("Failed to get checkout url for payment");
        return;
      }
      router.push(checkoutUrl);
    },
  });

  const disabled = !product || loading || isBuying;

  return (
    <Form {...form}>
      <form
        className="mt-2 w-full md:mt-0"
        onSubmit={form.handleSubmit(async ({ quantity }) => {
          if (disabled) return;

          await buyProduct({
            items: [{ productId: product.id, quantity }],
            successUrl: `${getHostUrl()}/success`,
            provider: "STRIPE",
          });
        })}
      >
        <div className="flex w-full items-center gap-2 md:flex-col md:items-start md:gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FormLabel className="md:text-xl">Qty</FormLabel>
                    <Input
                      className="w-[5ch] text-base md:text-lg"
                      {...field}
                    />
                  </div>
                  <FormMessage className="text-base" />
                </FormItem>
              );
            }}
          />
          <Button
            className="w-full max-w-[15rem] text-base md:max-w-max md:text-lg"
            disabled={disabled}
            size="lg"
          >
            Buy now
            {isBuying && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            <p className="sr-only">Buy this product now</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default function ProductPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: getProductQueryKey(id),
    queryFn: async () => {
      const {
        product,
      }: {
        product: Product;
      } = await fetch.get(`/products/${id}/get`).json();

      return product;
    },
    enabled: typeof id === "string" && id.length > 0,
    staleTime: Infinity,
  });

  const loading = !product || isLoadingProduct;

  return (
    <div className="pt-8 md:px-4">
      <section className="flex w-full flex-col gap-4 md:flex-row md:gap-8">
        <div className="relative flex aspect-square max-h-[40rem] w-full max-w-lg">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <Image
              className="h-full w-full object-cover object-center"
              src={product.images[0]}
              alt={`An image of ${product.name}`}
              fill
            />
          )}
        </div>
        <div className="flex flex-col gap-4 md:gap-8">
          <div>
            {loading ? (
              <Skeleton className="h-16 w-full max-w-[40rem] text-xl" />
            ) : (
              <h2 className="text-xl md:text-6xl">
                <b>{product.name}</b>
              </h2>
            )}

            {loading ? (
              <Skeleton className="mt-2 h-8 w-24" />
            ) : (
              <span className="inline-flex text-lg leading-none md:mt-1 md:text-3xl">
                ₹{loading ? <Skeleton /> : product.priceInr}
              </span>
            )}
          </div>
          {loading ? (
            <Skeleton className="h-60 w-full md:w-[40rem]" />
          ) : (
            <p className="max-w-3xl text-neutral-400 md:text-xl">
              {loading ? <Skeleton /> : product.description}
            </p>
          )}

          <BuyProductForm
            loading={loading}
            isLoadingProduct={isLoadingProduct}
            product={product}
          />
        </div>
      </section>
    </div>
  );
}
