import { readFileSync } from "fs";

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
  const selected = blockIntegers.find(
    (item) => item.start <= code && item.end >= code
  );
  if (!selected) return "Unknown Block";
  return selected.name;
}

export async function POST(req: Request) {
  const hex = decodeURIComponent(await req.json());

  if (!hex) return Response.json("Unicode hexadecimal must be defined");

  try {
    // Split query hex to array of string i.e [0041,0042,0043]
    const hexs = hex.split(",");

    const filteredHexs = hexs.map((item) =>
      // Find hex inside string i.e 0041
      // `0041;LATIN CAPITAL LETTER A;Lu;0;L;;;;;N;;;;0061;`
      arrayUnicode.find((d) => d.substring(0, d.indexOf(";")) === item)
    );

    const filteredHexsToObj = filteredHexs.map((item) => {
      if (!item) return undefined;
      const splited = item.split(";");
      const hex = splited[0];
      const name = splited[1];
      const codePoint = parseInt(splited[0], 16);

      return {
        block: findBlock(codePoint),
        codePoint,
        hex,
        name
      };
    });

    return Response.json(filteredHexsToObj);
  } catch (error) {
    return Response.json("Unicode API Error");
  }
}
