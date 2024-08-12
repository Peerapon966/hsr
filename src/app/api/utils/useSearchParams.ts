import { NextRequest } from "next/server";

export default function useSearchParams(req: NextRequest) {
  const url = (new URL(req.url)).searchParams;
  const params = new URLSearchParams(url);
  return params
}