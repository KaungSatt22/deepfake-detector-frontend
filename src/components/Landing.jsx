import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Landing = ({ onStart, dark }) => {
  const bg = dark ? "bg-gray-950" : "bg-white";
  const bgAlt = dark ? "bg-gray-900" : "bg-gray-100";
  const cardBg = dark ? "bg-gray-900" : "bg-gray-100";
  const stepBg = dark ? "bg-gray-950" : "bg-white";
  const pillBg = dark
    ? "bg-gray-800 text-gray-300"
    : "bg-gray-200 text-gray-700";
  const borderColor = dark ? "border-gray-800" : "border-gray-200";
  const footerText = dark ? "text-gray-600" : "text-gray-400";

  return (
    <div className={`min-h-screen ${bg} text-white flex flex-col`}>
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex items-center justify-between px-8 py-5 border-b ${borderColor}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <span className="text-xl font-bold text-blue-400">
            Deepfake Detector
          </span>
        </div>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition text-sm"
        >
          Try Free
        </button>
      </motion.nav>

      {/* Hero */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`flex flex-col items-center justify-center text-center px-6 py-24 gap-6 ${bg}`}
      >
        <motion.div
          variants={fadeUp}
          className="bg-blue-600 bg-opacity-20 border border-blue-500 text-blue-300 text-sm px-4 py-1 rounded-full"
        >
          🛡️ Free • No signup required • Instant results
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className={`text-5xl font-extrabold leading-tight max-w-2xl ${dark ? "text-white" : "text-gray-900"}`}
        >
          Detect <span className="text-blue-400">AI-Generated</span> Content
          Instantly
        </motion.h1>
        <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-xl">
          Protect yourself from scams, deepfakes, and forged documents. Upload
          any image, video, or transaction screenshot — get results in seconds.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex gap-3 flex-wrap justify-center"
        >
          <button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition text-lg"
          >
            Start Detecting →
          </button>
          <a
            href="#how"
            className={`${dark ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"} font-semibold px-8 py-4 rounded-2xl transition text-lg`}
          >
            How it works
          </a>
        </motion.div>
      </motion.section>

      {/* Stats */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex flex-wrap justify-center gap-8 px-8 py-12 ${bgAlt}`}
      >
        {[
          { value: "5", label: "Detection Modes" },
          { value: "Free", label: "Always Free" },
          { value: "Fast", label: "Instant Results" },
          { value: "99%", label: "Accuracy Rate" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center">
            <p className="text-4xl font-extrabold text-blue-400">{s.value}</p>
            <p className="text-gray-400 mt-1 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Features */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex flex-col items-center px-6 py-20 gap-12 ${bg}`}
      >
        <motion.h2
          variants={fadeUp}
          className={`text-3xl font-bold text-center ${dark ? "text-white" : "text-gray-900"}`}
        >
          What We Detect
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {[
            {
              icon: "🖼️",
              title: "Image Deepfake",
              desc: "Detect AI-generated faces, GAN images, and manipulated photos with high accuracy.",
              color: "border-blue-500",
            },
            {
              icon: "🎬",
              title: "Video Deepfake",
              desc: "Analyze video frames to detect face swaps, lip sync manipulation, and AI-generated videos.",
              color: "border-purple-500",
            },
            {
              icon: "🧾",
              title: "Transaction Forgery",
              desc: "Verify bank transfers, payment screenshots, and receipts for signs of digital manipulation.",
              color: "border-yellow-500",
            },
            {
              icon: "🔎",
              title: "Metadata Analysis",
              desc: "Extract hidden EXIF data — camera info, GPS location, edit history, and software used.",
              color: "border-green-500",
            },
            {
              icon: "📰",
              title: "Fake News Detection",
              desc: "Analyze news articles and URLs to detect misinformation, propaganda, and fake news using advanced AI.",
              color: "border-red-500",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className={`${cardBg} border-2 ${f.color} rounded-2xl p-6 flex flex-col gap-3 cursor-default`}
            >
              <span className="text-4xl">{f.icon}</span>
              <h3
                className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}
              >
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section
        id="how"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex flex-col items-center px-6 py-20 gap-12 ${bgAlt}`}
      >
        <motion.h2
          variants={fadeUp}
          className={`text-3xl font-bold text-center ${dark ? "text-white" : "text-gray-900"}`}
        >
          How It Works
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl">
          {[
            {
              step: "1",
              icon: "📁",
              title: "Upload",
              desc: "Upload any image, video, or screenshot",
            },
            {
              step: "2",
              icon: "🤖",
              title: "Analyze",
              desc: "Our AI models scan for manipulation signs",
            },
            {
              step: "3",
              icon: "📊",
              title: "Results",
              desc: "Get instant verdict with confidence score",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex-1 ${stepBg} rounded-2xl p-6 flex flex-col items-center text-center gap-3`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
                {s.step}
              </div>
              <span className="text-4xl">{s.icon}</span>
              <h3
                className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}
              >
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex flex-col items-center px-6 py-20 gap-8 ${bg}`}
      >
        <motion.h2
          variants={fadeUp}
          className={`text-3xl font-bold text-center ${dark ? "text-white" : "text-gray-900"}`}
        >
          Who Is This For?
        </motion.h2>
        <motion.div
          variants={stagger}
          className="flex flex-wrap justify-center gap-4 max-w-2xl"
        >
          {[
            "🛡️ Scam victims",
            "🏦 Banking users",
            "👮 Law enforcement",
            "📰 Journalists",
            "👨‍👩‍👧 General public",
            "🧑‍💻 Developers",
            "🏢 Businesses",
            "📱 Social media users",
          ].map((u, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className={`${pillBg} px-4 py-2 rounded-full text-sm cursor-default`}
            >
              {u}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col items-center px-6 py-20 gap-6 border-t ${dark ? "bg-blue-950 border-blue-800" : "bg-blue-50 border-blue-200"}`}
      >
        <h2
          className={`text-3xl font-bold text-center ${dark ? "text-white" : "text-gray-900"}`}
        >
          Start Protecting Yourself Today
        </h2>
        <p
          className={`text-center max-w-md ${dark ? "text-gray-400" : "text-gray-500"}`}
        >
          100% free. No account needed. Instant results.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition text-lg"
        >
          Try It Now →
        </motion.button>
      </motion.section>
      {/* Fake News Feature Highlight */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`flex flex-col items-center px-6 py-20 gap-8 ${bg}`}
      >
        <motion.div variants={fadeUp} className="text-center max-w-2xl">
          <span className="text-5xl">📰</span>
          <h2
            className={`text-3xl font-bold mt-4 ${dark ? "text-white" : "text-gray-900"}`}
          >
            Fight Fake News
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Paste any news article or URL — our AI analyzes credibility, detects
            red flags, and gives you a verdict in seconds.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {[
            {
              icon: "📝",
              title: "Text Analysis",
              desc: "Paste any news content directly",
            },
            {
              icon: "🔗",
              title: "URL Check",
              desc: "Submit any news article link",
            },
            {
              icon: "🖼️",
              title: "Screenshot OCR",
              desc: "Upload news screenshots",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className={`${dark ? "bg-gray-900" : "bg-gray-100"} rounded-2xl p-5 flex flex-col gap-2 text-center`}
            >
              <span className="text-3xl">{f.icon}</span>
              <h3
                className={`font-bold ${dark ? "text-white" : "text-gray-900"}`}
              >
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-2xl transition"
        >
          Check News Now →
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer
        className={`flex items-center justify-center px-8 py-6 border-t ${borderColor}`}
      >
        <p className={`text-sm ${footerText}`}>
          © 2025 Deepfake Detector — Built to fight scams
        </p>
      </footer>
    </div>
  );
};

export default Landing;
