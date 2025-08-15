import React, { useState } from "react";
import "./Home.css";

import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

function Home() {
  const [total, setTotal] = useState("");
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");
  const [symbols, setSymbols] = useState("");
  const [history, setHistory] = useState([]); // ✅ New
  const [error, setError] = useState("");
  const [lang, setLang] = useState("ar");
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");


  const t = {
    ar: {
      title: "🔐 مولّد الباسورد",
      total: "عدد الحروف الكلي",
      letters: "عدد الحروف",
      numbers: "عدد الأرقام",
      symbols: "عدد الرموز",
      generate: "توليد",
      copy: "نسخ الباسورد",
      error: "❌ المجموع غير متطابق مع العدد الكلي",
      strength: "قوة الباسورد",
      copied: "✅ تم النسخ!",
      lang: "الإنجليزية",
      dark: "وضع داكن",
      light: "وضع فاتح",
      weak: "ضعيف",
      medium: "متوسط",
      strong: "قوي",
      history: "تاريخ كلمات السر",
    },
    en: {
      title: "🔐 PASSWORD GENERATOR",
      total: "Total characters",
      letters: "Number of letters",
      numbers: "Number of numbers",
      symbols: "Number of symbols",
      generate: "Generate",
      copy: "Copy password",
      error: "❌ Sum doesn't match total characters",
      strength: "Password Strength",
      copied: "✅ Copied!",
      lang: "العربية",
      dark: "Dark Mode",
      light: "Light Mode",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      history: "Password History",
    },
  };

  const langData = t[lang];

  const API_URL = process.env.REACT_APP_API_URL;

  const generatePassword = async () => {
    const sum = Number(letters) + Number(numbers) + Number(symbols);
    if (Number(total) !== sum) {
      setError(langData.error);
      setPassword("");
      setStrength("");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/generate-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
          letters,
          numbers,
          symbols,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate password");
      }

      const data = await response.json();
      setPassword(data.password);
      setHistory([data.password, ...history]);

      if (total < 8) setStrength(langData.weak);
      else if (total < 12) setStrength(langData.medium);
      else setStrength(langData.strong);

    } catch (error) {
      console.error("Error:", error);
      setError("Error generating password");
    }


  };


  const [copiedIndex, setCopiedIndex] = useState(null);
  const copyPassword = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index); // نحفظ رقم العنصر اللي اتنسخ
    setTimeout(() => setCopiedIndex(null), 2000); // نرجع للأيقونة القديمة بعد ثانيتين
  };


  const toggleLang = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const toggleMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div style={{ padding: "5%" }}
      className={darkMode ? "App dark" : "App"}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="mainHeader">{langData.title}</h1>
      <div className="mainPassword">
        <div className="form">
          <label>{langData.total}
            <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
          </label>

          <label>{langData.letters}
            <input type="number" value={letters} onChange={(e) => setLetters(e.target.value)} />
          </label>

          <label>{langData.numbers}
            <input type="number" value={numbers} onChange={(e) => setNumbers(e.target.value)} />
          </label>

          <label>{langData.symbols}
            <input type="number" value={symbols} onChange={(e) => setSymbols(e.target.value)} />
          </label>

          <button onClick={generatePassword}>{langData.generate}</button>
          {password && (
            <div>
              <p>{langData.copy}: {password}</p>
              <p>{langData.strength}: {strength}</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="history">
            <h2>{langData.history}</h2>

            <ul>
              {history.map((p, index) => (
                <li key={index}>
                  <span>{p}</span>
                  <button className='copyButton' onClick={() => copyPassword(p, index)}>
                    {copiedIndex === index ? <LuCopyCheck /> : <LuCopy />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {error && <p className="error">{error}</p>}

      <div className="options">
        <button onClick={toggleLang}>{langData.lang}</button>
        <button onClick={toggleMode}>{darkMode ? langData.light : langData.dark}</button>
      </div>
    </div>
  );
}

export default Home;