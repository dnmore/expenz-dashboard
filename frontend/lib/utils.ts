import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "EUR",
  });
};
