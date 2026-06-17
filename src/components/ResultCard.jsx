import ConfidenceBar from "./ConfidenceBar";

const ResultCard = ({ result, dark }) => {
  const riskColors = {
    red: "text-red-400",
    orange: "text-orange-400",
    green: "text-green-400",
  };

  const isSuspicious =
    result.is_fake || (result.is_suspicious && result.verdict !== "Clean");
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const cardInfoBg = dark ? "bg-gray-800" : "bg-gray-100";
  const cardInfoText = dark ? "text-white" : "text-gray-900";
  const cardInfoLabel = dark ? "text-gray-500" : "text-gray-400";
  const metadataBg = dark ? "bg-gray-900" : "bg-gray-100";
  const metadataKey = dark ? "text-gray-500" : "text-gray-400";
  const metadataVal = dark ? "text-gray-300" : "text-gray-700";
  const scoreBreakdown =
    result.evidence_score !== undefined
      ? [
          ["Evidence score", result.evidence_score],
          ["Visual score", result.manipulation_score],
          ["OCR risk", result.ocr_risk_score],
          ["Authentic score", result.authentic_score],
        ]
      : result.manipulation_score !== undefined
        ? [
            ["Manipulation score", result.manipulation_score],
            ["Authentic score", result.authentic_score],
          ]
        : result.fake_score !== undefined
          ? [
              ["Fake score", result.fake_score],
              ["Real score", result.real_score],
            ]
          : [];

  return (
    <div
      className={`rounded-2xl p-6 border-2 ${isSuspicious ? "bg-red-950 border-red-500" : "bg-green-950 border-green-500"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-2xl font-bold text-white">
          {isSuspicious ? "🚨" : "✅"} {result.verdict}
        </p>
        {result.confidence !== undefined && (
          <p className="text-3xl text-white">{result.confidence}%</p>
        )}
      </div>

      {result.confidence !== undefined && (
        <>
          <p className={`${subText} text-sm mb-1`}>Verdict confidence</p>
          <ConfidenceBar value={result.confidence} isFake={isSuspicious} />
        </>
      )}

      {scoreBreakdown.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {scoreBreakdown.map(([label, value]) => (
            <div key={label} className={`${cardInfoBg} rounded-lg px-3 py-2`}>
              <p className={`${cardInfoLabel} text-xs`}>{label}</p>
              <p className={`${cardInfoText} text-sm font-semibold`}>
                {value}%
              </p>
            </div>
          ))}
        </div>
      )}

      {result.risk && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`${subText} text-sm`}>Risk Level:</span>
          <span
            className={`font-bold text-sm ${riskColors[result.risk_color] || "text-white"}`}
          >
            {result.risk}
          </span>
        </div>
      )}

      {result.warnings && result.warnings.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className={`${subText} text-sm font-semibold`}>Warnings</p>
          {result.warnings.map((w, i) => (
            <div
              key={i}
              className="bg-red-900 bg-opacity-50 rounded-lg px-3 py-2 text-sm text-red-300"
            >
              {w}
            </div>
          ))}
        </div>
      )}

      {result.ocr && (
        <div className="mt-4">
          <p className={`${subText} text-sm font-semibold mb-2`}>
            OCR Transaction Checks
          </p>
          <div className={`${metadataBg} rounded-xl p-3 flex flex-col gap-2`}>
            <div className="flex items-center justify-between gap-3">
              <span className={`${metadataKey} text-xs`}>Status</span>
              <span className={`${metadataVal} text-xs text-right`}>
                {result.ocr.status}
              </span>
            </div>

            {result.ocr.fields &&
              Object.entries(result.ocr.fields)
                .filter(
                  ([key, value]) =>
                    key !== "has_account_indicator" && value?.length,
                )
                .map(([key, value]) => (
                  <div key={key} className="flex gap-2 text-xs">
                    <span
                      className={`${metadataKey} min-w-24 shrink-0 capitalize`}
                    >
                      {key}
                    </span>
                    <span className={`${metadataVal} truncate`}>
                      {value.join(", ")}
                    </span>
                  </div>
                ))}

            {result.ocr.text_preview && (
              <p className={`${metadataVal} text-xs max-h-24 overflow-y-auto`}>
                {result.ocr.text_preview}
              </p>
            )}
          </div>
        </div>
      )}

      {result.file_info && (
        <div className="mt-4">
          <p className={`${subText} text-sm font-semibold mb-2`}>File Info</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(result.file_info).map(([k, v]) => (
              <div key={k} className={`${cardInfoBg} rounded-lg px-3 py-2`}>
                <p className={`${cardInfoLabel} text-xs capitalize`}>
                  {k.replace("_", " ")}
                </p>
                <p className={`${cardInfoText} text-sm truncate`}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.metadata && Object.keys(result.metadata).length > 0 && (
        <div className="mt-4">
          <p className={`${subText} text-sm font-semibold mb-2`}>
            EXIF Metadata
          </p>
          <div
            className={`${metadataBg} rounded-xl p-3 max-h-48 overflow-y-auto flex flex-col gap-1`}
          >
            {Object.entries(result.metadata).map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className={`${metadataKey} min-w-32 shrink-0`}>{k}</span>
                <span className={`${metadataVal} truncate`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.frames_analyzed && (
        <p className={`${subText} text-xs mt-3`}>
          🎞️ {result.frames_analyzed} frames analyzed
        </p>
      )}

      <p className={`${subText} text-xs mt-3`}>
        {isSuspicious
          ? "This file shows signs of manipulation or suspicious metadata."
          : "This file appears authentic with no signs of manipulation."}
      </p>
    </div>
  );
};

export default ResultCard;
