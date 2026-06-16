import React, { useEffect, useState } from "react";
import { ScreenType } from "../types";

interface SleepAnalysisProps {
  navigate: (screen: ScreenType, transition: "none" | "push") => void;
}

export default function SleepAnalysis({ navigate }: SleepAnalysisProps) {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-[#121212] text-[#e5e2e1] relative">
      {/* Top AppBar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-[#121212]/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img
              alt="김동찬 프로필"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW3lIgRiJtZwN5fV5YzRvrJYCEclRB1ObXTw_3J6q84lAOJybThQLEmPGdIEWDKg1kWvMJfm1oisl7EkPXVuRsJxxy3Uqo6SUTK7LWSHc1HfUE9gB8vPXiGyAI7AGVpq7jrqOkzRqyrZ_S5ReSahdqN8cfWKmc6GsnLavKcglnvAmlA0OEGuOZaWXV1j6BtB_PYgxideazxMUPy_46s7UL7p9FllNRe-8qPRELXuDIk6oobvNhp8Xk8c7sG_ZBXUtvf6Q441YAFnMM"
            />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">수면 분석</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[#d0bcff] text-xl">notifications</span>
        </button>
      </header>

      <main className="flex-1 mt-18 mb-16 px-4 py-5 overflow-y-auto space-y-4 custom-scrollbar">
        {/* Sleep Score Prominent Card */}
        <section className="bg-[#1c1c1e] p-5 rounded-[24px] relative overflow-hidden border border-white/[0.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d0bcff]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#8e8e93] font-medium uppercase tracking-wider">
                수면 점수
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[#d0bcff] tracking-tight leading-none">
                  85
                </span>
                <span className="text-base text-[#8e8e93] font-medium">/100</span>
              </div>
              <p className="text-xs text-[#4edea3] flex items-center gap-1 font-semibold pt-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                최상의 회복 상태
              </p>
            </div>
            {/* Mini Progress Ring */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-[#d0bcff]/10 stroke-current"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-[#d0bcff] stroke-current"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  strokeDasharray="251.2"
                  strokeDashoffset="37.68"
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#d0bcff] text-2xl">bedtime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep Stage Breakdown */}
        <section className="space-y-2">
          <h2 className="text-md font-bold text-white px-1">수면 단계</h2>
          <div className="bg-[#1c1c1e] p-5 rounded-[24px] space-y-5 border border-white/[0.02]">
            <div className="flex h-28 items-end justify-between gap-2 px-1">
              {/* Awake */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#f2b8b5]/20 rounded-t-md transition-all duration-700"
                  style={{ height: animateBars ? "15%" : "0%" }}
                ></div>
                <span className="text-[10px] text-[#8e8e93] font-medium leading-none">깸</span>
              </div>
              {/* REM */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#d0bcff] rounded-t-md transition-all duration-700"
                  style={{ height: animateBars ? "45%" : "0%" }}
                ></div>
                <span className="text-[10px] text-[#8e8e93] font-medium leading-none">램 수면</span>
              </div>
              {/* Light */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#e8ddff]/50 rounded-t-md transition-all duration-700"
                  style={{ height: animateBars ? "75%" : "0%" }}
                ></div>
                <span className="text-[10px] text-[#8e8e93] font-medium leading-none">얕은 수면</span>
              </div>
              {/* Deep */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#adc6ff] rounded-t-md shadow-[0_0_8px_rgba(173,198,255,0.4)] transition-all duration-700"
                  style={{ height: animateBars ? "60%" : "0%" }}
                ></div>
                <span className="text-[10px] text-[#8e8e93] font-medium leading-none">깊은 수면</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#2c2c2e]/50 p-3.5 rounded-[16px] flex items-center gap-2.5">
                <div className="w-1.5 h-8 bg-[#adc6ff] rounded-full"></div>
                <div>
                  <p className="text-[10px] text-[#8e8e93] font-medium leading-none">깊은 수면</p>
                  <p className="text-sm font-bold text-white mt-1">1시간 45분</p>
                </div>
              </div>
              <div className="bg-[#2c2c2e]/50 p-3.5 rounded-[16px] flex items-center gap-2.5">
                <div className="w-1.5 h-8 bg-[#d0bcff] rounded-full"></div>
                <div>
                  <p className="text-[10px] text-[#8e8e93] font-medium leading-none">램 수면</p>
                  <p className="text-sm font-bold text-white mt-1">2시간 12분</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep Trends */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-md font-bold text-white">수면 트렌드</h2>
            <button className="text-xs text-[#d0bcff] font-semibold">
              전체 보기
            </button>
          </div>
          <div className="bg-[#1c1c1e] p-5 rounded-[24px] border border-white/[0.02]">
            <div className="relative h-32 w-full flex items-end justify-between px-1 gap-1.5">
              {[
                { day: "월", fill: "50%" },
                { day: "화", fill: "66%" },
                { day: "수", fill: "60%" },
                { day: "목", fill: "100%", active: true },
                { day: "금", fill: "33%" },
                { day: "토", fill: "80%" },
                { day: "일", fill: "50%" },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-7 bg-[#202022] rounded-full h-[85px] flex flex-col justify-end overflow-hidden relative">
                    <div
                      className={`w-full ${item.active ? "bg-[#d0bcff]" : "bg-[#5d738f]/60"} rounded-full transition-all duration-700`}
                      style={{ height: animateBars ? item.fill : "0%" }}
                    ></div>
                  </div>
                  <span className={`text-xs ${item.active ? "text-[#d0bcff] font-bold" : "text-[#8e8e93] font-medium"} leading-none`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sleep Insights Card */}
        <section className="space-y-2">
          <h2 className="text-md font-bold text-white px-1">오늘의 인사이트</h2>
          <div className="bg-[#1c1c1e] p-5 rounded-[24px] flex gap-4 relative overflow-hidden border border-white/[0.02]">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#d0bcff]/5 rounded-full blur-2xl"></div>
            <div className="w-14 h-14 rounded-2xl bg-[#d0bcff]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#d0bcff] text-2xl">lightbulb</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">
                일관성이 핵심입니다
              </h3>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                3일 연속으로 같은 시간에 잠자리에 드셨네요. 이는 생체 리듬을 개선하고 깊은 수면 단계를
                12% 향상시킵니다.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary Info */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex flex-col gap-2 border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#d0bcff] text-2xl">alarm</span>
            <div>
              <p className="text-[10px] text-[#8e8e93] font-semibold">기상 시간</p>
              <p className="text-md font-bold text-white mt-[1px]">오전 06:30</p>
            </div>
          </div>
          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex flex-col gap-2 border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#4edea3] text-2xl">air</span>
            <div>
              <p className="text-[10px] text-[#8e8e93] font-semibold">호흡률</p>
              <p className="text-md font-bold text-white mt-[1px]">14 rpm</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sleep 하단 네비게이션 */}
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
          className="flex flex-col items-center justify-center text-white font-bold transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.SLEEP_ANALYSIS, "none")}
        >
          <span className="material-symbols-outlined text-[#d0bcff]">bedtime</span>
          <span className="text-[10px] mt-1 font-semibold text-[#d0bcff]">수면</span>
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
