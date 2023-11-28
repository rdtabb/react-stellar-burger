import React, { useState, useEffect } from "react";

import { useUserInfoQuery } from "../../../services/api/apiSlice";

export const useProfileFormState = () => {
  const { data: user, isLoading } = useUserInfoQuery("userinfo");

  const [name, setName] = useState<string>(user?.user.name ?? "");
  const [email, setEmail] = useState<string>(user?.user.email ?? "");

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [user?.user]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  return {
    name,
    email,
    handleNameChange,
    handleEmailChange,
    isLoading,
  };
};
