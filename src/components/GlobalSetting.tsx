import { useTheme } from "next-themes";

export default function GlobalSetting() {
    const { themes, setTheme, theme } = useTheme();
    return (
        <div>
            Global Setting
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
