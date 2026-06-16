import React, { useEffect, useState } from "react";
import { ScreenType } from "../types";

interface DashboardProps {
  navigate: (screen: ScreenType, transition: "none" | "push") => void;
  currentSteps: number;
}

export default function Dashboard({ navigate, currentSteps }: DashboardProps) {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stepPercent = Math.min(100, Math.round((currentSteps / 10000) * 100));

  return (
    <div className="flex flex-col min-h-full bg-[#121212] text-[#e5e2e1] relative">
      {/* TopAppBar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-[#121212]/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
            <img
              alt="사용자 프로필"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyYaNfpASLxbGno8gh4QVvFLBUdFdPPrOwq94BUYQTeoZvNQeQc4Ky2dAmFUhQ4ouIYuUD0T1j6r03NmY-P2Uix2aPu9q1KZ-_cHhl_6MIbTIeO1H8L6UWQNMFmEN1kE6FU8SIsvN0c7ectU9ABVlJ5dWHyK22i2eQnTXUGKWWz1Ocp8T28G_ikzOttB1aFYIQcu-0J5RRdhHBpSjfHvkIL4Bd9_S0Syb2dDKO1gW1q9qI7B6HTDSiSpIyvFnIHtxkXUL7C5FbTqaa"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              김동찬님, 환영합니다
            </h1>
            <p className="text-xs text-[#8e8e93]">
              오늘도 건강한 하루를 보내고 계시네요
            </p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[#adc6ff] text-xl">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-18 mb-16 px-4 py-5 overflow-y-auto space-y-4 custom-scrollbar">
        {/* Bento Grid layout matching the vertical mobile look in the attached screenshot */}
        <div className="flex flex-col gap-4">
          
          {/* Steps Card */}
          <div
            id="steps-card-link"
            className="bg-[#1c1c1e] p-5 rounded-[24px] flex flex-col justify-between h-[175px] relative cursor-pointer border border-white/[0.02]"
            onClick={() => navigate(ScreenType.ACTIVITY_TRACKING, "push")}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-[#8e8e93] font-medium leading-none">걸음 수</span>
                <h2 className="text-[38px] font-bold text-[#adc6ff] mt-1.5 font-sans tracking-tight leading-none">
                  {currentSteps.toLocaleString()}
                </h2>
              </div>
              <span className="material-symbols-outlined text-[#adc6ff] text-2xl">directions_walk</span>
            </div>
            
            <div className="w-full">
              <div className="w-full h-1.5 bg-[#2c2c2e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#adc6ff] rounded-full transition-all duration-700"
                  style={{ width: `${stepPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#8e8e93] mt-2.5 font-medium">
                일일 목표의 {stepPercent}% 달성
              </p>
            </div>
          </div>

          {/* Sleep Card */}
          <div
            id="sleep-card-link"
            className="bg-[#1c1c1e] p-5 rounded-[24px] flex flex-col justify-between h-[185px] cursor-pointer border border-white/[0.02]"
            onClick={() => navigate(ScreenType.SLEEP_ANALYSIS, "push")}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-[#8e8e93] font-medium leading-none">수면 시간</span>
                <h2 className="text-[32px] font-bold text-white mt-1.5 font-sans tracking-tight leading-none">
                  7시간 20분
                </h2>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff] text-2xl">bedtime</span>
            </div>

            {/* Custom Chunky Sleep Bar Visualization from user image */}
            <div className="flex items-end gap-2 h-14 px-1">
              <div className="flex-1 bg-[#2c2c2e] h-4 rounded-md"></div>
              <div className="flex-1 bg-[#2c2c2e] h-8 rounded-md"></div>
              <div className="flex-1 bg-[#d0bcff] h-14 rounded-md shadow-[0_0_12px_rgba(208,188,255,0.4)]"></div>
              <div className="flex-1 bg-[#35343d] h-10 rounded-md"></div>
              <div className="flex-1 bg-[#2c2c2e] h-6 rounded-md"></div>
            </div>

            <p className="text-xs text-[#8e8e93] font-medium">
              깊은 수면: 2시간 15분
            </p>
          </div>

          {/* Calories Card */}
          <div className="bg-[#1c1c1e] p-5 rounded-[24px] flex flex-col justify-between h-[175px] border border-white/[0.02]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-[#8e8e93] font-medium leading-none">칼로리 소모</span>
                <h2 className="text-[32px] font-bold text-[#4edea3] mt-1.5 font-sans tracking-tight leading-none">
                  450 <span className="text-base font-normal text-[#4edea3] ml-0.5">kcal</span>
                </h2>
              </div>
              <span className="material-symbols-outlined text-[#4edea3] text-2xl">local_fire_department</span>
            </div>

            <div className="w-full">
              <div className="w-full h-1.5 bg-[#1e2a22] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4edea3] rounded-full transition-all duration-700"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <p className="text-xs text-[#8e8e93] mt-2.5 font-medium">
                활발한 활동 세션 진행 중
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Activity Trends Chart Area - Perfect Capsule Layout */}
        <section className="bg-[#1c1c1e] p-5 rounded-[24px] border border-white/[0.02]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-md font-bold text-white">주간 활동</h3>
            <div className="flex items-center gap-1 bg-[#2c2c2e] text-xs text-[#8e8e93] font-semibold px-2 py-1 rounded-[8px] cursor-pointer">
              <span>최근 7일</span>
              <span className="material-symbols-outlined text-xs">expand_more</span>
            </div>
          </div>

          {/* Pillar Bar Layout replicating mockup perfectly */}
          <div className="relative h-40 w-full flex items-end justify-between px-1 gap-1.5">
            {[
              { day: "월", fill: "75%" },
              { day: "화", fill: "85%" },
              { day: "수", fill: "50%" },
              { day: "목", fill: "0%" },
              { day: "금", fill: "0%" },
              { day: "토", fill: "0%" },
              { day: "일", fill: "0%" },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Thick Capsule pillar container */}
                <div className="w-7 md:w-8 bg-[#202022] rounded-full h-[110px] flex flex-col justify-end overflow-hidden relative">
                  {/* Capsule fill */}
                  <div
                    className="w-full bg-[#5d738f] rounded-full transition-all duration-700"
                    style={{ height: animateBars ? item.fill : "0%" }}
                  ></div>
                </div>
                <span className="text-xs text-[#8e8e93] font-medium leading-none">{item.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Insights / Secondary Section matching the bottom items */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex items-center gap-3.5 border border-white/[0.02]">
            <div className="w-10 h-10 rounded-full bg-[#182820] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#4edea3] text-[22px]">bolt</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">생체 지표 확인</h4>
              <p className="text-xs text-[#8e8e93] mt-[2px]">심박수: 62 bpm</p>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-4 rounded-[20px] flex items-center gap-3.5 border border-white/[0.02]">
            <div className="w-10 h-10 rounded-full bg-[#211f30] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#d0bcff] text-[22px]">psychology</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">마음 챙김</h4>
              <p className="text-xs text-[#8e8e93] mt-[2px]">15분 스트릭 유지 중</p>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar - Premium Mobile Tab Nav */}
      <nav className="absolute bottom-0 left-0 w-full z-45 flex justify-around items-center h-16 bg-[#121212]/95 backdrop-blur-md border-t border-white/[0.04]">
        {/* Home (Active) */}
        <button
          id="nav-home"
          className="flex flex-col items-center justify-center text-white font-bold transition-all duration-150 cursor-pointer active:scale-95"
          onClick={() => navigate(ScreenType.DASHBOARD, "none")}
        >
          <span className="material-symbols-outlined text-[#adc6ff]">home</span>
          <span className="text-[10px] mt-1 font-semibold text-[#adc6ff]">홈</span>
        </button>
        {/* Activity */}
        <button
          id="nav-activity"
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 cursor-pointer active:scale-95"
          onClick={() => navigate(ScreenType.ACTIVITY_TRACKING, "none")}
        >
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="text-[10px] mt-1 font-medium">활동</span>
        </button>
        {/* Sleep */}
        <button
          id="nav-sleep"
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 cursor-pointer active:scale-95"
          onClick={() => navigate(ScreenType.SLEEP_ANALYSIS, "none")}
        >
          <span className="material-symbols-outlined">bedtime</span>
          <span className="text-[10px] mt-1 font-medium">수면</span>
        </button>
        {/* Profile */}
        <button
          id="nav-profile"
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 cursor-pointer active:scale-95"
          onClick={() => navigate(ScreenType.USER_PROFILE, "none")}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] mt-1 font-medium">프로필</span>
        </button>
      </nav>
    </div>
  );
}
