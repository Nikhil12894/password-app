import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { saveAs } from "file-saver";

const getStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500" };
    if (score === 3 || score === 4)
        return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
};

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+=-{}[]|:;<>,.?/";

        let charPool = "";
        if (includeUppercase) charPool += uppercase;
        if (includeLowercase) charPool += lowercase;
        if (includeNumbers) charPool += numbers;
        if (includeSymbols) charPool += symbols;

        if (charPool.length === 0) return "Please select at least one option";

        let generated = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            generated += charPool[randomIndex];
        }
        return generated;
    };

    const savePassword = () => {
        const blob = new Blob([password], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "password.txt");
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    useEffect(() => {
        setPassword(generatePassword());
    }, [
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    ]);

    const strength = getStrength(password);

    return (
            <div className="max-w-2xl mx-auto">
                {/* <div className="flex justify-end mb-4">
                    <Button onClick={() => setDarkMode(!darkMode)} variant="outline">
                        Toggle {darkMode ? "Light" : "Dark"} Mode
                    </Button>
                </div> */}

                <Card className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold text-center">
                        Password Generator
                    </h2>

                    <div className="flex items-center gap-2">
                        <Input readOnly value={password} className="flex-1" />
                        <Button onClick={handleCopy}>{copied ? "Copied!" : "Copy"} </Button>
                    </div>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className={`h-2 rounded-full ${strength.color}`}
                            style={{
                                width: `${strength.label === "Weak"
                                        ? 33
                                        : strength.label === "Medium"
                                            ? 66
                                            : 100
                                    }%`
                            }}
                        ></div>
                    </div>
                    <div className="text-sm text-center">Strength: {strength.label}</div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Length: {length}
                        </label>
                        <Slider
                            min={4}
                            max={32}
                            step={1}
                            value={[length]}
                            onValueChange={([val]) => setLength(val)}
                        />

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeUppercase}
                                    onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
                                />
                                <label>Include Uppercase</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeLowercase}
                                    onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
                                />
                                <label>Include Lowercase</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeNumbers}
                                    onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
                                />
                                <label>Include Numbers</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeSymbols}
                                    onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
                                />
                                <label>Include Symbols</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button onClick={() => setPassword(generatePassword())}>
                            Regenerate
                        </Button>
                        <Button onClick={savePassword} variant="outline">
                            Save
                        </Button>
                    </div>
                </Card>
            </div>
    );
};

export default PasswordGenerator;
