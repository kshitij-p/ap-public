import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, TypeOf } from "zod";
import { UseFormProps, useForm as useRHFForm } from "react-hook-form";

export const useForm = <TSchema extends Schema>(
  schema: TSchema,
  options?: Omit<UseFormProps<TypeOf<TSchema>>, "resolver">,
) => {
  return useRHFForm<TypeOf<TSchema>>({
    ...options,
    resolver: zodResolver(schema),
  });
};
