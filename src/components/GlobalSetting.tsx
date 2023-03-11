import { useTheme } from "next-themes";
import SectionHeader from "./SectionHeader";

export default function GlobalSetting() {
    const { themes, setTheme, theme } = useTheme();
    return (
        <div>
            <SectionHeader>
                <div
                    style={{
                        fontSize: "2em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    Global Setting
                </div>
            </SectionHeader>
            <div>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    {themes.map((item, i) => (
                        <option key={i} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
