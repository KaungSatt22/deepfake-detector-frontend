import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakeNewsChecker({ dark }) {
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const bg = dark ? "bg-gray-950" : "bg-white";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const inputBg = dark
    ? "bg-gray-900 border-gray-700 text-white"
    : "bg-gray-50 border-gray-300 text-gray-900";
  const tabsBg = dark ? "bg-gray-900" : "bg-gray-100";
  const tabInactive = dark
    ? "text-gray-400 hover:text-white"
    : "text-gray-500 hover:text-gray-900";

  const handleAnalyze = async () => {
    if (mode === "text" && !text.trim()) return;
    if (mode === "url" && !url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setProgressText("Preparing analysis...");

    const steps = [
      {
        pct: 20,
        text: mode === "url" ? "Fetching article..." : "Processing text...",
      },
      { pct: 40, text: "Checking facts..." },
      { pct: 60, text: "Analyzing credibility..." },
      { pct: 80, text: "Running AI analysis..." },
      { pct: 95, text: "Finalizing results..." },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i].pct);
        setProgressText(steps[i].text);
        i++;
      }
    }, 800);

    try {
      const response = await fetch("http://localhost:8000/analyze-fakenews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: mode === "text" ? text : "",
          url: mode === "url" ? url : "",
        }),
      });

      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      setProgressText("Done!");

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      clearInterval(interval);
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
      setProgress(0);
      setProgressText("");
    }
  };

  const getVerdictColor = (verdict) => {
    if (!verdict) return "";
    const v = verdict.toLowerCase();
    if (v.includes("fake")) return "border-red-500 bg-red-950";
    if (v.includes("likely fake")) return "border-orange-500 bg-orange-950";
    if (v.includes("uncertain")) return "border-yellow-500 bg-yellow-950";
    if (v.includes("likely real")) return "border-blue-500 bg-blue-950";
    return "border-green-500 bg-green-950";
  };

  const getVerdictIcon = (verdict) => {
    if (!verdict) return "❓";
    const v = verdict.toLowerCase();
    if (v.includes("fake")) return "🚨";
    if (v.includes("likely fake")) return "⚠️";
    if (v.includes("uncertain")) return "🔍";
    if (v.includes("likely real")) return "🔵";
    return "✅";
  };

  return (
    <div
      className={`min-h-screen ${bg} flex flex-col items-center p-6 gap-6 transition-colors duration-300`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2
          className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}
        >
          📰 Fake News Detector
        </h2>
        <p className={`${subText} text-sm mt-1`}>
          Paste news text or enter a URL to check credibility
        </p>
      </motion.div>

      {/* Mode Tabs */}
      <div className={`flex ${tabsBg} rounded-xl p-1 gap-1`}>
        <button
          onClick={() => {
            setMode("text");
            setResult(null);
            setError(null);
          }}
          className={`px-5 py-2 rounded-lg font-semibold transition text-sm ${mode === "text" ? "bg-blue-600 text-white" : tabInactive}`}
        >
          📝 Text
        </button>
        <button
          onClick={() => {
            setMode("url");
            setResult(null);
            setError(null);
          }}
          className={`px-5 py-2 rounded-lg font-semibold transition text-sm ${mode === "url" ? "bg-blue-600 text-white" : tabInactive}`}
        >
          🔗 URL
        </button>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-4">
        {/* Input */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {mode === "text" ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste news article or message here..."
              rows={6}
              className={`w-full border rounded-2xl p-4 text-sm resize-none outline-none focus:border-blue-500 transition ${inputBg}`}
            />
          ) : (
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news-article"
              className={`w-full border rounded-2xl p-4 text-sm outline-none focus:border-blue-500 transition ${inputBg}`}
            />
          )}
        </motion.div>

        {/* Analyze Button */}
        <AnimatePresence>
          {(mode === "text" ? text.trim() : url.trim()) && !loading && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Check Credibility
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className={`${subText} text-sm`}>{progressText}</p>
              <div className="w-full max-w-xs">
                <div
                  className={`w-full ${dark ? "bg-gray-800" : "bg-gray-200"} rounded-full h-2`}
                >
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-blue-400 text-xs text-center mt-1">
                  {progress}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-900 border border-red-500 rounded-2xl p-4 text-center"
            >
              <p className="text-red-300">❌ {error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl p-6 border-2 ${getVerdictColor(result.verdict)} flex flex-col gap-4`}
            >
              {/* Verdict */}
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-white">
                  {getVerdictIcon(result.verdict)} {result.verdict}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.confidence}%
                </p>
              </div>

              {/* Confidence Bar */}
              <div>
                <p className="text-gray-400 text-xs mb-1">Confidence</p>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${result.is_fake ? "bg-red-500" : "bg-green-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </div>

              {/* Summary */}
              {result.summary && (
                <div
                  className={`${dark ? "bg-gray-800" : "bg-gray-700"} bg-opacity-50 rounded-xl p-3`}
                >
                  <p className="text-gray-300 text-sm">📄 {result.summary}</p>
                </div>
              )}

              {/* Credibility Score */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  Credibility Score:
                </span>
                <span
                  className={`font-bold text-sm ${
                    result.credibility_score > 70
                      ? "text-green-400"
                      : result.credibility_score > 40
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {result.credibility_score}/100
                </span>
              </div>

              {/* Red Flags */}
              {result.red_flags && result.red_flags.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-red-400 text-sm font-semibold">
                    🚩 Red Flags
                  </p>
                  {result.red_flags.map((flag, i) => (
                    <div
                      key={i}
                      className="bg-red-900 bg-opacity-50 rounded-lg px-3 py-2 text-sm text-red-300"
                    >
                      {flag}
                    </div>
                  ))}
                </div>
              )}

              {/* Reasons */}
              {result.reasons && result.reasons.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-sm font-semibold">
                    📋 Analysis
                  </p>
                  {result.reasons.map((reason, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 bg-opacity-50 rounded-lg px-3 py-2 text-sm text-gray-300"
                    >
                      • {reason}
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendation */}
              {result.recommendation && (
                <div className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-xl p-3">
                  <p className="text-blue-300 text-sm">
                    💡 {result.recommendation}
                  </p>
                </div>
              )}

              {/* Source URL */}
              {result.source_url && (
                <a
                  href={result.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-xs underline truncate"
                >
                  🔗 {result.source_url}
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
