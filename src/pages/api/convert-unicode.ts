import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync, writeFileSync } from "fs";

// Static unicode data file path
const unicodeDataPath = process.cwd() + "/src/libs/UnicodeData.txt";
const unicodeDataBlockPath = process.cwd() + "/src/libs/UnicodeBlocks.txt";

// Read unicode data
const unicodes = readFileSync(unicodeDataPath, "utf-8");
const blocks = readFileSync(unicodeDataBlockPath, "utf-8");

// Split to array line by line
const arrayUnicode = unicodes.split("\n");
const arrayBlock = blocks.split("\n");

const blockIntegers = arrayBlock.map((item) => {
    // Split from format `0000..007F; Basic Latin`
    const splited = item.split(";");
    const splitHexs = splited[0].split("..");
    return {
        name: splited[1].slice(1), // Remove first whitespace,
        start: parseInt(splitHexs[0], 16),
        end: parseInt(splitHexs[1], 16)
    };
});

function findBlock(code: number) {
    const selected = blockIntegers.find((item) => item.start <= code && item.end >= code);
    if (!selected) return "Unknown Block";
    return selected.name;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // `hex;name;Lu;0;L;;;;;N;;;;0061;`
    const toArrayObj = arrayUnicode.map((item) => {
        const splited = item.split(";");
        const codePoint = parseInt(splited[0], 16);
        return {
            hex: splited[0],
            name: splited[1],
            block: findBlock(codePoint),
            codePoint: codePoint
        };
    });

    const unicodeDataPathJson = process.cwd() + "/src/libs/UnicodeData.json";

    try {
        writeFileSync(unicodeDataPathJson, JSON.stringify(toArrayObj, null, 4));
        return res.status(200).json(toArrayObj);
    } catch (error) {
        return res.status(500).send(error);
    }
}
