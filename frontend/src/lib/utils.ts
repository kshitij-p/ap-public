import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let hostUrl: string;
export const getHostUrl = () => {
  if (!hostUrl) {
    hostUrl = `${process.env.NODE_ENV === "development" ? "http://" : "https://"}${process.env.NEXT_PUBLIC_VERCEL_URL ?? "localhost:3000"}`;
  }
  return hostUrl;
};
