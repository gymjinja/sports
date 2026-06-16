import React, { useState } from "react";
import { ScreenType, ArchiveRecord } from "../types";

interface DataArchiveProps {
  navigate: (screen: ScreenType, transition: "none" | "push") => void;
  currentSteps: number;
}

export default function DataArchive({ navigate, currentSteps }: DataArchiveProps) {
  const [selectedRange, setSelectedRange] = useState("일간");
  const [loading, setLoading] = useState(false);
  const [loadCompleted, setLoadCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [records, setRecords] = useState<ArchiveRecord[]>([
    {
      id: "arc-1",
      date: "2023.10.24 화요일",
      title: "최고 활동 기록",
      steps: 12450,
      sleepHours: "7시간 20분",
      calories: 540,
      badge: "verified",
      colorClass: "border-[#adc6ff]/20 bg-[#1c1c1e]",
    },
    {
      id: "arc-2",
      date: "2023.10.23 월요일",
      title: "균형 잡힌 하루",
      steps: 8200,
      sleepHours: "6시간 45분",
      calories: 380,
      badge: "insights",
      colorClass: "border-[#d0bcff]/20 bg-[#1c1c1e]",
    },
    {
      id: "arc-3",
      date: "2023.10.22 일요일",
      title: "휴식 및 회복",
      steps: 3100,
      sleepHours: "9시간 15분",
      calories: 120,
      badge: "none",
      colorClass: "border-white/[0.02] bg-[#1c1c1e]",
    },
  ]);

  const handleSimulateLoad = () => {
    setLoading(true);
    setLoadCompleted(false);

    setTimeout(() => {
      setLoading(false);
      setLoadCompleted(true);
      
      const isNewExists = records.some(r => r.id === "arc-loaded");
      if (!isNewExists) {
        const loadedRecord: ArchiveRecord = {
          id: "arc-loaded",
          date: "2023.10.25 수요일",
          title: "동기화된 동적 기록",
          steps: currentSteps,
          sleepHours: "8시간 05분",
          calories: 490,
          badge: "verified",
          colorClass: "border-[#adc6ff]/20 bg-[#1c1c1e]",
        };
        setRecords(prev => [loadedRecord, ...prev]);
      }

      setToastMessage("클라우드 데이터를 동기화했습니다!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      setTimeout(() => {
        setLoadCompleted(false);
      }, 2000);
    }, 1500);
  };

  const handleSaveData = () => {
    const todayStr = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    });
    
    const todayRecord: ArchiveRecord = {
      id: `arc-today-${Date.now()}`,
      date: todayStr,
      title: "오늘의 누적 기록",
      steps: currentSteps,
      sleepHours: "7시간 20분",
      calories: Math.round(currentSteps * 0.04),
      badge: "verified",
      colorClass: "border-[#adc6ff]/20 bg-[#1c1c1e]",
    };

    setRecords(prev => [todayRecord, ...prev]);
    setToastMessage("일일 데이터가 성공적으로 저장되었습니다!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#121212] text-[#e5e2e1] relative">
      {/* Top AppBar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-4 bg-[#121212]/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(ScreenType.DASHBOARD, "none")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors shrink-0 mr-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-md">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-white tracking-tight">데이터 보관함</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[#adc6ff] text-xl">notifications</span>
        </button>
      </header>

      <main className="flex-1 mt-18 mb-16 px-4 py-5 overflow-y-auto space-y-5 text-left custom-scrollbar">
        {/* Date Range Selector Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-md font-bold text-white">기간 별 아카이브</h2>
            <span className="material-symbols-outlined text-[#adc6ff] text-md">calendar_today</span>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {["일간", "주간", "월간", "전체"].map((range) => {
              const isSelected = selectedRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/30 font-bold"
                      : "bg-[#1c1c1e] text-[#8e8e93] border border-transparent"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleSimulateLoad}
            disabled={loading}
            className="w-full py-4 bg-[#adc6ff] text-[#121212] rounded-2xl text-xs font-bold shadow-lg shadow-[#adc6ff]/10 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:opacity-75"
          >
            <span
              className={`material-symbols-outlined text-md ${loading ? "animate-spin" : ""}`}
            >
              {loading ? "sync" : loadCompleted ? "check_circle" : "download"}
            </span>
            <span>
              {loading
                ? "클라우드 동기화 요청 중..."
                : loadCompleted
                ? "동기화 완료"
                : "클라우드 데이터 동기화"}
            </span>
          </button>
        </section>

        {/* Stats Visualization Area */}
        <section
          className="space-y-3 transition-opacity duration-300"
          style={{ opacity: loading ? 0.3 : 1 }}
        >
          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                className={`p-5 rounded-[24px] space-y-4 border ${rec.colorClass || "border-white/[0.02] bg-[#1c1c1e]"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-[#8e8e93] font-bold uppercase tracking-wider">
                      {rec.date}
                    </p>
                    <h3 className="text-sm font-bold text-white mt-1.5">{rec.title}</h3>
                  </div>
                  {rec.badge === "verified" ? (
                    <span className="material-symbols-outlined text-[#4edea3] text-lg">verified</span>
                  ) : rec.badge === "insights" ? (
                    <span className="material-symbols-outlined text-[#d0bcff] text-lg">insights</span>
                  ) : (
                    <span className="material-symbols-outlined text-[#8e8e93] text-lg">event_repeat</span>
                  )}
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#8e8e93]">
                      <span className="material-symbols-outlined text-sm text-[#adc6ff]">footprint</span>
                      <span className="text-xs">
                        {rec.steps.toLocaleString()} 걸음
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8e8e93]">
                      <span className="material-symbols-outlined text-sm text-[#d0bcff]">bedtime</span>
                      <span className="text-xs">{rec.sleepHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8e8e93]">
                      <span className="material-symbols-outlined text-sm text-[#4edea3]">
                        local_fire_department
                      </span>
                      <span className="text-xs">{rec.calories} kcal</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-white/5 rounded-xl text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-md">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save Daily Prompt Card */}
        <section className="pt-2 pb-6">
          <div className="bg-gradient-to-r from-[#adc6ff]/10 to-[#d0bcff]/5 border border-white/[0.02] rounded-[24px] p-5 flex items-center justify-between shadow-xl">
            <div className="space-y-1 min-w-0 pr-2">
              <h4 className="text-sm font-bold text-white">오늘의 데이터 로컬 백업</h4>
              <p className="text-xs text-[#8e8e93]">
                실시간 헬스키트 수치를 보관함에 동기화합니다.
              </p>
            </div>
            <button
              onClick={handleSaveData}
              className="w-11 h-11 bg-[#adc6ff] text-[#121212] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-lg font-bold">cloud_upload</span>
            </button>
          </div>
        </section>
      </main>

      {/* Toast Alert */}
      {showToast && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 bg-[#adc6ff] text-[#121212] text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 left-0 w-full z-45 flex justify-around items-center h-16 bg-[#121212]/95 backdrop-blur-md border-t border-white/[0.04]">
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.DASHBOARD, "none")}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] mt-1 font-medium">홈</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.ACTIVITY_TRACKING, "none")}
        >
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="text-[10px] mt-1 font-medium">활동</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.SLEEP_ANALYSIS, "none")}
        >
          <span className="material-symbols-outlined">bedtime</span>
          <span className="text-[10px] mt-1 font-medium">수면</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.USER_PROFILE, "none")}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] mt-1 font-medium">프로필</span>
        </button>
      </nav>
    </div>
  );
}
