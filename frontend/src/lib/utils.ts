import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let hostUrl: string;
export const getHostUrl = () => {
  if (!hostUrl) {
    hostUrl = `${"http://"}${process.env.NEXT_PUBLIC_VERCEL_URL ?? "localhost:3000"}`;
  }
  return hostUrl;
};
