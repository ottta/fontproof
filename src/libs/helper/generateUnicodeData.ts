import { IUnicodeData } from "@/types/unicode";
import fetcher from "./fetcher";

export default async function generateUnicodeData(chars: string[]) {
    const encodedChars = encodeURIComponent(chars.join(","));
    const reqData = await fetcher<IUnicodeData[]>(`/api/unicode/${encodedChars}`);
    return reqData;
}
