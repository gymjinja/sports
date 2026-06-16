import React, { useEffect, useState } from "react";
import { ScreenType, ActivityRecord } from "../types";

interface ActivityTrackingProps {
  navigate: (screen: ScreenType, transition: "none" | "push") => void;
  currentSteps: number;
  incrementSteps: (amount: number) => void;
}

export default function ActivityTracking({
  navigate,
  currentSteps,
  incrementSteps,
}: ActivityTrackingProps) {
  const [selectedDay, setSelectedDay] = useState(14); // Default to 14 (수요일)
  const [showAddModal, setShowAddModal] = useState(false);
  const [records, setRecords] = useState<ActivityRecord[]>([
    {
      id: "act-1",
      type: "directions_run",
      icon: "directions_run",
      title: "아침 조깅",
      time: "오늘, 오전 07:20",
      duration: "35:12",
      metric: "4.2 km",
      colorClass: "bg-[#adc6ff]/10",
      iconColorClass: "text-[#adc6ff]",
    },
    {
      id: "act-2",
      type: "directions_bike",
      icon: "directions_bike",
      title: "저녁 사이클링",
      time: "어제, 오후 06:45",
      duration: "1:12:05",
      metric: "18.5 km",
      colorClass: "bg-[#4edea3]/10",
      iconColorClass: "text-[#4edea3]",
    },
    {
      id: "act-3",
      type: "self_improvement",
      icon: "self_improvement",
      title: "마음 챙김 요가",
      time: "9월 12일, 오전 08:00",
      duration: "25:00",
      metric: "145 kcal",
      colorClass: "bg-[#d0bcff]/10",
      iconColorClass: "text-[#d0bcff]",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newMetric, setNewMetric] = useState("");
  const [newType, setNewType] = useState("directions_run");

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDuration || !newMetric) return;

    const colors: Record<string, { bg: string; text: string }> = {
      directions_run: { bg: "bg-[#adc6ff]/10", text: "text-[#adc6ff]" },
      directions_bike: { bg: "bg-[#4edea3]/10", text: "text-[#4edea3]" },
      self_improvement: { bg: "bg-[#d0bcff]/10", text: "text-[#d0bcff]" },
    };

    const config = colors[newType] || { bg: "bg-[#adc6ff]/10", text: "text-[#adc6ff]" };

    const newRecord: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: newType,
      icon: newType,
      title: newTitle,
      time: "오늘, 방금 전",
      duration: newDuration,
      metric: newMetric,
      colorClass: config.bg,
      iconColorClass: config.text,
    };

    setRecords([newRecord, ...records]);
    setNewTitle("");
    setNewDuration("");
    setNewMetric("");
    setShowAddModal(false);
  };

  const targetSteps = 10000;
  const circumference = 691;
  const progressRatio = Math.min(1.0, currentSteps / targetSteps);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex flex-col min-h-full bg-[#121212] text-[#e5e2e1] relative">
      {/* Top AppBar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-[#121212]/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img
              alt="김동찬"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdqhmriW_oP0oCRsqeIwdvJMwGdOyuEeRy4KMHhHxKQvYkvmJ0Nu8A7q0_3WYsFBAM3OQYMEYdTd1_8je_txjSs_Io38wWBE3epWDriUkLl0ElkrJ9O2tBWYvbGTLZD5rAxJhRGpG57AGewDqMjWJeOVI0gojrwieg9VF21m5a0Q08CkqH4EsRStOtHQYsBPvoZqzJYY1IREjwVl4J-YERRUOuJhuXzkI1y9QYR_WMmcN1mhTWFZm_resWroSFJn1Gg7LB8jDuH18N"
            />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">활동 관리</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[#adc6ff] text-xl">notifications</span>
        </button>
      </header>

      <main className="flex-1 mt-18 mb-16 px-4 py-5 overflow-y-auto space-y-4 custom-scrollbar">
        {/* Horizontal Calendar */}
        <section className="flex gap-2 pb-1 overflow-x-auto hide-scrollbar">
          {[
            { tag: "월", num: 12 },
            { tag: "화", num: 13 },
            { tag: "수", num: 14 },
            { tag: "목", num: 15 },
            { tag: "금", num: 16 },
            { tag: "토", num: 17 },
          ].map((day) => {
            const isSelected = selectedDay === day.num;
            return (
              <button
                key={day.num}
                onClick={() => setSelectedDay(day.num)}
                className={`flex flex-col items-center min-w-[56px] py-3 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#adc6ff] text-[#121212] font-bold shadow-lg shadow-[#adc6ff]/10"
                    : "bg-[#1c1c1e] text-[#8e8e93]"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider">{day.tag}</span>
                <span className="text-sm font-black mt-1">{day.num}</span>
              </button>
            );
          })}
        </section>

        {/* Main Daily Progress Chart */}
        <section className="relative flex flex-col items-center justify-center bg-[#1c1c1e] p-6 rounded-[24px] overflow-hidden border border-white/[0.02]">
          <div className="absolute -top-24 -right-24 w-6 geometry-glow bg-[#adc6ff]/5 blur-3xl rounded-full"></div>

          <div className="relative w-56 h-56">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
              <circle
                className="text-white/5"
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeWidth="12"
              ></circle>
              <circle
                className="text-[#adc6ff] progress-ring-glow transition-all duration-700"
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="12"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#adc6ff] text-2xl mb-1">
                footprint
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">{currentSteps.toLocaleString()}</h2>
              <p className="text-[10px] text-[#8e8e93] font-semibold mt-1">목표 10,000 걸음</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8 w-full border-t border-white/[0.04] pt-5">
            <div className="text-center">
              <p className="text-[10px] text-[#8e8e93] font-semibold">소모 칼로리</p>
              <p className="text-md font-bold text-white mt-1">
                1,240 <span className="text-xs font-normal text-[#8e8e93]">kcal</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-[#8e8e93] font-semibold">총 활동 시간</p>
              <p className="text-md font-bold text-white mt-1">
                45 <span className="text-xs font-normal text-[#8e8e93]">분</span>
              </p>
            </div>
          </div>
        </section>

        {/* Action Button - Simulation */}
        <div className="flex gap-2">
          <button
            onClick={() => incrementSteps(1000)}
            className="flex-1 py-3.5 rounded-2xl bg-[#adc6ff]/10 hover:bg-[#adc6ff]/20 text-[#adc6ff] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">touch_app</span>
            +1,000걸음 걷기 시뮬레이션
          </button>
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex flex-col justify-between aspect-square border border-white/[0.02]">
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-full bg-[#adc6ff]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#adc6ff] text-xl">distance</span>
              </div>
              <span className="material-symbols-outlined text-[#8e8e93] text-sm">
                trending_up
              </span>
            </div>
            <div>
              <h3 className="text-[10px] text-[#8e8e93] font-semibold">거리</h3>
              <p className="text-xl font-bold text-white mt-1">
                5.4 <span className="text-xs font-normal text-[#8e8e93]">km</span>
              </p>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex flex-col justify-between aspect-square border border-white/[0.02]">
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-full bg-[#4edea3]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#4edea3] text-xl">timer</span>
              </div>
              <span className="material-symbols-outlined text-[#8e8e93] text-sm">info</span>
            </div>
            <div>
              <h3 className="text-[10px] text-[#8e8e93] font-semibold">활동 시간</h3>
              <p className="text-xl font-bold text-white mt-1">
                32 <span className="text-xs font-normal text-[#8e8e93]">분</span>
              </p>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex flex-col justify-between col-span-2 border border-white/[0.02] gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f2b8b5]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#f2b8b5] text-xl">favorite</span>
                </div>
                <h3 className="text-[10px] text-[#8e8e93] font-semibold">실시간 심박수</h3>
              </div>
              <p className="text-xl font-bold text-white">
                72 <span className="text-xs font-normal text-[#8e8e93]">bpm</span>
              </p>
            </div>
            {/* Smooth pulse wave bars */}
            <div className="h-10 w-full flex items-end gap-1 px-1">
              <div className="flex-1 bg-[#f2b8b5]/25 rounded-t-sm h-[40%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/25 rounded-t-sm h-[60%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/40 rounded-t-sm h-[80%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/50 rounded-t-sm h-[70%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/70 rounded-t-sm h-[90%]"></div>
              <div className="flex-1 bg-[#f2b8b5] rounded-t-sm h-[100%] shadow-[0_0_8px_rgba(242,184,181,0.4)]"></div>
              <div className="flex-1 bg-[#f2b8b5]/70 rounded-t-sm h-[75%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/50 rounded-t-sm h-[55%]"></div>
              <div className="flex-1 bg-[#f2b8b5]/25 rounded-t-sm h-[45%]"></div>
            </div>
          </div>
        </section>

        {/* Activity History */}
        <section className="space-y-3 pb-8">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-md font-bold text-white">활동 기록</h2>
            <button
              onClick={() => navigate(ScreenType.DATA_ARCHIVE, "push")}
              className="text-xs text-[#adc6ff] font-semibold"
            >
              전체 보기
            </button>
          </div>
          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#1c1c1e] p-4 rounded-[20px] flex items-center gap-3.5 border border-white/[0.02]"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${rec.colorClass} flex items-center justify-center shrink-0`}
                >
                  <span className={`material-symbols-outlined ${rec.iconColorClass} text-xl`}>
                    {rec.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-[#8e8e93] mt-[2px]">{rec.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">
                    {rec.duration}
                  </p>
                  <p className={`text-[10px] mt-[2px] font-bold uppercase tracking-wider ${rec.iconColorClass}`}>
                    {rec.metric}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-20 right-5 w-12 h-12 bg-[#adc6ff] text-[#121212] rounded-full shadow-lg shadow-[#adc6ff]/20 flex items-center justify-center active:scale-90 transition-transform z-30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[24px] font-bold">add</span>
      </button>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/[0.04] rounded-[24px] w-full max-w-sm p-6 space-y-4 shadow-2xl relative z-10">
            <h3 className="text-md font-bold text-white">활동 추가하기</h3>
            <form onSubmit={handleAddActivity} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                  활동 종류
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "directions_run", label: "조깅", icon: "directions_run" },
                    { value: "directions_bike", label: "사이클", icon: "directions_bike" },
                    { value: "self_improvement", label: "명상/요가", icon: "self_improvement" },
                  ].map((elem) => (
                    <button
                      key={elem.value}
                      type="button"
                      onClick={() => setNewType(elem.value)}
                      className={`flex-1 py-2 px-1 border rounded-xl transition-all flex items-center justify-center gap-1 text-xs ${
                        newType === elem.value
                          ? "bg-[#adc6ff] border-[#adc6ff] text-[#121212] font-semibold"
                          : "border-white/10 text-[#8e8e93] hover:bg-white/5"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{elem.icon}</span>
                      {elem.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                  활동 이름
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 근력 운동, 아침 런닝구"
                  className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                    운동 시간
                  </label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="예: 45:00"
                    className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                    기록 수치
                  </label>
                  <input
                    type="text"
                    required
                    value={newMetric}
                    onChange={(e) => setNewMetric(e.target.value)}
                    placeholder="예: 5.2 km"
                    className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-[#202022] hover:bg-white/5 rounded-xl text-xs text-white font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#adc6ff] text-[#121212] rounded-xl text-xs font-bold shadow-lg shadow-[#adc6ff]/10"
                >
                  활동 기록하기
                </button>
              </div>
            </form>
          </div>
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
          className="flex flex-col items-center justify-center text-white font-bold transition-all duration-150 active:scale-95 cursor-pointer"
          onClick={() => navigate(ScreenType.ACTIVITY_TRACKING, "none")}
        >
          <span className="material-symbols-outlined text-[#adc6ff]">fitness_center</span>
          <span className="text-[10px] mt-1 font-semibold text-[#adc6ff]">활동</span>
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
