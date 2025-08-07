import React, { useState } from "react";
import "./Home.css";

import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

function Home() {
  const [total, setTotal] = useState("");
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");
  const [symbols, setSymbols] = useState("");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]); // ✅ New
  const [error, setError] = useState("");
  const [lang, setLang] = useState("ar");
  const [darkMode, setDarkMode] = useState(false);
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

  const generatePassword = () => {
    const sum = Number(letters) + Number(numbers) + Number(symbols);
    if (Number(total) !== sum) {
      setError(langData.error);
      setPassword("");
      setStrength("");
      return;
    }

    setError("");
    const lettersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersSet = "0123456789";
    const symbolsSet = "!@#$%^&*()_+";

    let chars = "";
    chars += getRandomChars(lettersSet, Number(letters));
    chars += getRandomChars(numbersSet, Number(numbers));
    chars += getRandomChars(symbolsSet, Number(symbols));

    const final = chars.split("").sort(() => Math.random() - 0.5).join("");
    setPassword(final);
    setHistory([final, ...history]); // ✅ Add to history

    // Strength
    if (total < 8) setStrength(langData.weak);
    else if (total < 12) setStrength(langData.medium);
    else setStrength(langData.strong);
  };

  const getRandomChars = (charset, count) => {
    let result = "";
    for (let i = 0; i < count; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
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
    <div style={{  padding: "5%" }}
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