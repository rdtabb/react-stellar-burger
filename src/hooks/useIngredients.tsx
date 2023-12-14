import { useMemo } from "react";
import { useGetIngredientsQuery } from "../services/api/apiSlice";

import { CACHE_KEYS } from "../utils";

export const useIngredients = () => {
  const { data, isLoading, isError } = useGetIngredientsQuery(
    CACHE_KEYS.INGREDIENTS,
  );

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
  const defaultIngredient = useMemo(
    () =>
      data?.data.find(
        (item) => item.name === "Биокотлета из марсианской магнолии",
      ),
    [data?.data],
  );

  return useMemo(
    () => ({
      isLoading,
      mains,
      buns,
      sauces,
      isError,
      defaultIngredient,
    }),
    [isLoading, mains, buns, sauces, isError],
  );
};
