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
