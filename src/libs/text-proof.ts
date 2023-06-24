const capitalLetter = Array(26)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 65));
const smallLetter = Array(26)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 97));
const digitNumber = Array(10)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 48));
const genPunc1 = Array(15)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 33));
const genPunc2 = Array(7)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 58));
const genPunc3 = Array(6)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 91));
const genPunc4 = Array(4)
    .fill("")
    .map((_, i) => String.fromCodePoint(i + 123));

export const BASIC_CHARACTERS = capitalLetter.concat(
    smallLetter,
    digitNumber,
    genPunc1,
    genPunc2,
    genPunc3,
    genPunc4
);

export const PROOF_HAMBURGERS = [
    {
        key: "hamburgedfontstive",
        value: "HAMBURGEDFONTSIVhamburgedfontsiv"
    },
    {
        key: "hamburged-spacing",
        value: "HHAHOAOO HHBHOBOO HHDHODOO HHEHOEOO HHFHOFOO HHGHOGOO HHHHOHOO HHIHOIOO HHMHOMOO HHNHONOO HHOHOOOO HHRHOROO HHSHOSOO HHTHOTOO HHUHOUOO HHVHOVOO hhahoaoo hhbhoboo hhdhodoo hhehoeoo hhfhofoo hhghogoo hhhhohoo hhihoioo hhlholoo hhmhomoo hhnhonoo hhohoooo hhrhoroo hhshosoo hhthotoo hhuhouoo hhvhovoo"
    }
];
