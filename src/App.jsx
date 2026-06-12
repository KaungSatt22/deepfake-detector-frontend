import React, { useState } from "react";
import Detector from "./components/Detector";
import Landing from "./components/Landing";

const App = () => {
  const [started, setStarted] = useState(false);
  const [dark, setDark] = useState(true);

  return (
    <div
      className={`${dark ? "bg-gray-950 text-white" : "bg-white text-gray-900"} min-h-screen transition-colors duration-300 relative`}
    >
      {/* Theme Toggle — bottom right */}
      <button
        onClick={() => setDark(!dark)}
        className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition
          ${dark ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {started ? (
        <Detector onBack={() => setStarted(false)} dark={dark} />
      ) : (
        <Landing onStart={() => setStarted(true)} dark={dark} />
      )}
    </div>
  );
};

export default App;
