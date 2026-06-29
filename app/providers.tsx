"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { SolanaProvider } from "./solanaProvider";
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}> <SolanaProvider>{children}</SolanaProvider></Provider>;
}