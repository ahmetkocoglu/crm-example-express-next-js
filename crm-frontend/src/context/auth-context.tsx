import { AppDispatch } from "@/store";
import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIsLogin } from "@/store/apps/login";

// ** Defaults
const defaultProvider: any = {
  user: null,
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext(defaultProvider);

export function AuthProvider({ children }: Props) {
    // ** Redux
    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIsLogin());
  }, [dispatch]);

  const sharedData = "Context API Kullanımı";

  return <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>;
}

// Consumer Hook
export function useAuthContext() {
  return useContext(AuthContext);
}
