import fetcher from "./fetcher";

import { IUnicodeData } from "@/types/unicode";

export default async function generateUnicodeData(chars: string[]) {
  const encodedChars = encodeURIComponent(chars.join(","));
  const reqData = await fetcher<IUnicodeData[]>(`/api/unicode/test`, {
    method: "POST",
    body: JSON.stringify(encodedChars)
  });
  return reqData;
}
