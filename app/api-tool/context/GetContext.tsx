"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type QueryKeyValuesType = {
  id: number | undefined;
  query: string | number | undefined;
  value: string | number | undefined;
};

interface QueryKVContextType {
  queryKeyValues: QueryKeyValuesType[];
  setQueryKeyValues: React.Dispatch<React.SetStateAction<QueryKeyValuesType[]>>;
}
export const defaultQKV: QueryKVContextType = {
  queryKeyValues: [{ id: 0, query: "", value: "" }],
  setQueryKeyValues: () => {},
};

export const GetQueryKeyValueContext =
  createContext<QueryKVContextType>(defaultQKV);

type GetContextProviderProps = {
  children: ReactNode;
};

export const GetContextProvider = ({ children }: GetContextProviderProps) => {
  const [queryKeyValues, setQueryKeyValues] = useState<QueryKeyValuesType[]>(
    defaultQKV.queryKeyValues,
  );

  return (
    <GetQueryKeyValueContext.Provider
      value={{ queryKeyValues, setQueryKeyValues }}
    >
      {children}
    </GetQueryKeyValueContext.Provider>
  );
};

export const useGetContext = () => {
  const context = useContext(GetQueryKeyValueContext);
  if (!context) {
    throw new Error("useGetContext mus be within a GetContextProvider");
  }
  return context;
};
