export default async function fetcher<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const response = await fetch(input, init);
    const status = response.status;

    // if (status >= 500) {
    //     throw new Error("Internal Server Error");
    // }

    const data = await response.json();
    return data;
}
