import { IUnicodeData } from "@/types/unicode";
import fetcher from "./fetcher";

export default async function generateUnicodeData(chars: string[]) {
    const reqData = await fetcher<IUnicodeData[]>(`/api/unicode/helo`, {
        method: "POST",
        body: JSON.stringify(chars),
        headers: { "Content-type": "application/json" }
    });
    return reqData;
}
