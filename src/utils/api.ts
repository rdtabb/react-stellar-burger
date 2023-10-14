import { FetchIngredientsResponse } from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";
export const POST_ORDER_URL = `${BASE_URL}/orders`;
export const FETCH_INGREDIENTS = `${BASE_URL}/ingredients`;
export const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (response: Response): void => {
  if (!response.ok) {
    throw new Error(
      `Order fetch failed with response status: ${response.status}`,
    );
  }
};

export const request = async <T>(
  url: string,
  requestParams: RequestInit,
): Promise<T[] | T> => {
  const response = await fetch(url, requestParams);
  checkResponse(response);
  const data: FetchIngredientsResponse<T> | T = await response.json();

  if ((data as FetchIngredientsResponse<T>).data) {
    return (data as FetchIngredientsResponse<T>).data as T[];
  }

  return data as T;
};
