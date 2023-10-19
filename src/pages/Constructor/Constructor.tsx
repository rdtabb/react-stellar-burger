import React from "react";
import App from "../../components/app/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initAuthCheck } from "../../services/authSlice";
import { fetchUserInfo } from "../../services/asyncThunks";

const Constructor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuthCheck());
    dispatch(fetchUserInfo());
  }, []);

  return <App />;
};

export default Constructor;
