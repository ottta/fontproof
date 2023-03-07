export function isASCII(str?: string) {
    if (!str) return false;
    return /^[\x00-\x7F]*$/.test(str);
}

export function isValidUrl(str: string) {
    return /(http(s?)):\/\//i.test(str);
}

export function failedCheck(label: string, url?: boolean) {
    if (url) return `${label} should contains protocol e.g (http | https)`;
    return `${label} must be only ASCII characters`;
}
