import React from "react";

const HistoryItem = ({ item, onClick, dark }) => {
  const isSuspicious = item.result.is_fake || item.result.is_suspicious;
  const itemBg = dark
    ? "bg-gray-900 hover:bg-gray-800"
    : "bg-gray-100 hover:bg-gray-200";
  const nameText = dark ? "text-gray-300" : "text-gray-700";
  const thumbBg = dark ? "bg-gray-700" : "bg-gray-300";

  return (
    <div
      onClick={() => onClick(item)}
      className={`flex items-center gap-3 ${itemBg} cursor-pointer rounded-xl p-3 transition`}
    >
      {item.type === "video" ? (
        <div
          className={`w-12 h-12 rounded-lg ${thumbBg} flex items-center justify-center text-2xl`}
        >
          🎬
        </div>
      ) : (
        <img src={item.preview} className="w-12 h-12 rounded-lg object-cover" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${nameText} truncate`}>{item.filename}</p>
        <p
          className={`text-xs font-semibold ${isSuspicious ? "text-red-400" : "text-green-400"}`}
        >
          {item.result.verdict}{" "}
          {item.result.confidence ? `— ${item.result.confidence}%` : ""}
        </p>
      </div>
      <span className="text-xl">{isSuspicious ? "🚨" : "✅"}</span>
    </div>
  );
};

export default HistoryItem;
