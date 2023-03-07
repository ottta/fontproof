import useFont from "@/hooks/use-font";
import useOpentypeData from "@/hooks/use-opentype-data";

export default function FontSelector() {
    const { fonts } = useOpentypeData();
    const { font, chooseFont } = useFont();
    return (
        <div>
            <select value={font.names.postScriptName} onChange={(e) => chooseFont(e.target.value)}>
                {fonts.map((item, i) => (
                    <option key={i} value={item.names.postScriptName}>
                        {item.names.fullName}
                    </option>
                ))}
            </select>
        </div>
    );
}
