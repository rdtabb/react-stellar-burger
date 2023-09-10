import React, { useContext } from "react";
import { ConstructorContext } from "../context/ConstructorContext";

const useConstructorContext = () => {
  return useContext(ConstructorContext);
};

export default useConstructorContext;
