import { useDarkMode } from "@/components/hooks/useDarkMode";
import PasswordGenerator from "@/components/custom/PasswordGenerator";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <header className="p-4 flex justify-end">
        <button onClick={() => setDarkMode(!darkMode)} className="text-sm underline">
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      <main className="p-4">
        <PasswordGenerator />
      </main>
    </div>
  );
}

export default App;
