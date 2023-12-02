import { AuthRegResponse, Tokens } from "./types";

export const SESSSION_STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export const setSessionItem = (
  key: keyof typeof SESSSION_STORAGE_KEYS,
  value: string,
) => {
  sessionStorage.setItem(key, value);
};

export const destroySessionItem = (key: keyof typeof SESSSION_STORAGE_KEYS) => {
  sessionStorage.removeItem(key);
};

export const setTokens = (payload: AuthRegResponse) => {
  console.log("setting session items", payload);
  setSessionItem("ACCESS_TOKEN", payload.accessToken);
  setSessionItem("REFRESH_TOKEN", payload.refreshToken);
};

export const destroyTokens = () => {
  destroySessionItem("REFRESH_TOKEN");
  destroySessionItem("ACCESS_TOKEN");
};

export const getTokens = (): Tokens | undefined => {
  const refreshToken = sessionStorage.getItem(
    SESSSION_STORAGE_KEYS.REFRESH_TOKEN,
  );
  const accessToken = sessionStorage.getItem(
    SESSSION_STORAGE_KEYS.ACCESS_TOKEN,
  );

  if (!refreshToken || !accessToken) {
    return undefined;
  }

  return {
    refreshToken,
    accessToken,
  };
};
