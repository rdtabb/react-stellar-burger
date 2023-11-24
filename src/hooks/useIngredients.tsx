import { useMemo } from "react";
import { useGetIngredientsQuery } from "../services/api/apiSlice";

export const useIngredients = () => {
  const { data, isLoading, isError } = useGetIngredientsQuery("ingredients");

  const mains = useMemo(
    () => data?.data.filter((item) => item.type === "main"),
    [data?.data],
  );
  const buns = useMemo(
    () => data?.data.filter((item) => item.type === "bun"),
    [data?.data],
  );
  const sauces = useMemo(
    () => data?.data.filter((item) => item.type === "sauce"),
    [data?.data],
  );

  return useMemo(
    () => ({
      isLoading,
      mains,
      buns,
      sauces,
      isError,
    }),
    [isLoading, mains, buns, sauces, isError],
  );
};
