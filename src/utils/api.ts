import { AuthRegResponse, Urls } from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";
const BASE_AUTH_URL = `${BASE_URL}/auth`;

export const URLS: Urls = {
  POST_ORDER_URL: `${BASE_URL}/orders`,
  FETCH_INGREDIENTS: `${BASE_URL}/ingredients`,
  AUTH_URL: `${BASE_AUTH_URL}/login`,
  GET_USER_INFO_URL: `${BASE_AUTH_URL}/user`,
  REGISTER_URL: `${BASE_AUTH_URL}/register`,
  SIGNOUT_URL: `${BASE_AUTH_URL}/logout`,
  UPDATE_TOKEN_URL: `${BASE_AUTH_URL}/token`,
};

export const ROUTES = {
  CONSTRUCTOR: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
};

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
): Promise<T> => {
  const response = await fetch(url, requestParams);
  checkResponse(response);
  const data: T = await response.json();
  return data;
};
