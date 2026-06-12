import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResultCard from "./ResultCard";
import HistoryItem from "./HistoryItem";

const TABS = [
  {
    id: "image",
    label: "🖼️ Image",
    accept: "image/*",
    hint: "JPG, PNG supported",
    endpoint: "/analyze",
  },
  {
    id: "video",
    label: "🎬 Video",
    accept: "video/*",
    hint: "MP4, MOV supported",
    endpoint: "/analyze-video",
  },
  {
    id: "transaction",
    label: "🧾 Transaction",
    accept: "image/*",
    hint: "Screenshot, JPG, PNG",
    endpoint: "/analyze-transaction",
  },
  {
    id: "metadata",
    label: "🔎 Metadata",
    accept: "image/*",
    hint: "JPG, PNG supported",
    endpoint: "/analyze-metadata",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const Detector = ({ onBack, dark }) => {
  const [tab, setTab] = useState("image");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const bg = dark ? "bg-gray-950" : "bg-white";
  const text = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const tabsBg = dark ? "bg-gray-900" : "bg-gray-100";
  const tabInactive = dark
    ? "text-gray-400 hover:text-white"
    : "text-gray-500 hover:text-gray-900";
  const uploadBox = dark ? "hover:bg-blue-950" : "hover:bg-blue-50";
  const historyLabel = dark ? "text-gray-400" : "text-gray-500";

  const currentTab = TABS.find((t) => t.id === tab);
  const isVideo = tab === "video";

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleUpload = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:8000${currentTab.endpoint}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.error) {
        setError(data.detail || data.error || "Something went wrong");
      } else {
        setResult(data);
        setHistory((prev) => [
          {
            preview: isVideo ? null : preview,
            filename: file.name,
            result: data,
            type: tab,
            id: Date.now(),
          },
          ...prev.slice(0, 9),
        ]);
      }
    } catch (err) {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = (t) => {
    setTab(t);
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${bg} ${text} flex flex-col items-center p-6 gap-6 transition-colors duration-300`}
    >
      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl flex items-center justify-between"
      >
        <button
          onClick={onBack}
          className={`${subText} hover:text-blue-400 text-sm transition`}
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔍</span>
          <span className="text-lg font-bold text-blue-400">
            Deepfake Detector
          </span>
        </div>
        <div className="w-12" />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`flex flex-wrap justify-center ${tabsBg} rounded-xl p-1 gap-1`}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabSwitch(t.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${tab === t.id ? "bg-blue-600 text-white" : tabInactive}`}
          >
            {t.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="w-full max-w-xl flex flex-col gap-4"
      >
        {/* Tips */}
        <AnimatePresence mode="wait">
          {tab === "transaction" && (
            <motion.div
              key="transaction-tip"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-yellow-950 border border-yellow-600 rounded-xl p-3 text-sm text-yellow-300"
            >
              💡 Upload bank transfer screenshots, payment proofs, or receipts
              to check for forgery.
            </motion.div>
          )}
          {tab === "metadata" && (
            <motion.div
              key="metadata-tip"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-950 border border-blue-600 rounded-xl p-3 text-sm text-blue-300"
            >
              💡 Upload any image to extract hidden EXIF data — camera info, GPS
              location, edit history.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Box */}
        <motion.label
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`w-full border-2 border-dashed border-blue-500 rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer ${uploadBox} transition`}
        >
          <motion.span
            key={tab}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl"
          >
            {tab === "image"
              ? "📁"
              : tab === "video"
                ? "🎬"
                : tab === "transaction"
                  ? "🧾"
                  : "🔎"}
          </motion.span>
          <span className={subText}>
            Click or drag & drop {isVideo ? "video" : "image"}
          </span>
          <span className={`${subText} text-sm`}>{currentTab.hint}</span>
          <input
            type="file"
            accept={currentTab.accept}
            className="hidden"
            onChange={handleUpload}
          />
        </motion.label>

        {/* Preview */}
        <AnimatePresence>
          {preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              {isVideo ? (
                <video
                  src={preview}
                  controls
                  className="rounded-2xl w-full max-h-72"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-2xl w-full object-cover max-h-72"
                />
              )}
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${result.is_fake || result.is_suspicious ? "bg-red-600" : "bg-green-600"} text-white`}
                >
                  {result.is_fake || result.is_suspicious
                    ? "🚨 SUSPICIOUS"
                    : "✅ CLEAN"}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* File name */}
        <AnimatePresence>
          {file && (
            <motion.p
              key="filename"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${subText} text-sm text-center truncate`}
            >
              📄 {file.name}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Analyze Button */}
        <AnimatePresence>
          {file && !loading && (
            <motion.button
              key="analyze-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Analyze{" "}
              {tab === "image"
                ? "Image"
                : tab === "video"
                  ? "Video"
                  : tab === "transaction"
                    ? "Transaction"
                    : "Metadata"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className={`${subText} text-sm`}>
                {isVideo
                  ? "Analyzing video frames... this may take a minute"
                  : "Analyzing..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
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
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultCard result={result} dark={dark} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2"
            >
              <p className={`${historyLabel} text-sm font-semibold`}>
                Recent Scans
              </p>
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HistoryItem
                    item={item}
                    dark={dark}
                    onClick={(i) => {
                      setPreview(i.preview);
                      setResult(i.result);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Detector;
