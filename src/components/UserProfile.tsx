import React, { useState } from "react";
import { ScreenType, UserProfileData } from "../types";

interface UserProfileProps {
  navigate: (screen: ScreenType, transition: "none" | "push") => void;
  profile: UserProfileData;
  updateProfile: (data: Partial<UserProfileData>) => void;
}

export default function UserProfile({ navigate, profile, updateProfile }: UserProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedWeight, setEditedWeight] = useState(profile.weight);
  const [editedHeight, setEditedHeight] = useState(profile.height);
  const [editedGoal, setEditedGoal] = useState(profile.goal);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editedName,
      weight: editedWeight,
      height: editedHeight,
      goal: editedGoal,
    });
    setShowEditModal(false);
  };

  const [showReportToast, setShowReportToast] = useState(false);
  const handleExportReport = () => {
    setShowReportToast(true);
    setTimeout(() => {
      setShowReportToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#121212] text-[#e5e2e1] relative">
      {/* Top AppBar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-[#121212]/95 backdrop-blur-md">
        <h1 className="text-lg font-bold text-white tracking-tight">마이 프로필</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[#adc6ff] text-xl">notifications</span>
        </button>
      </header>

      <main className="flex-1 mt-18 mb-16 px-4 py-5 overflow-y-auto space-y-5 text-left custom-scrollbar">
        {/* Profile Info Card */}
        <section className="bg-[#1c1c1e] rounded-[24px] p-5 relative overflow-hidden flex items-center gap-4 border border-white/[0.02]">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img alt="김동찬" className="w-full h-full object-cover" src={profile.avatarUrl} />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#4edea3] rounded-full border border-[#1c1c1e] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[10px] text-[#121212] font-black">check</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="text-md font-bold text-white truncate">
                {profile.name}
              </h2>
              <span className="bg-[#adc6ff]/10 text-[#adc6ff] px-2.5 py-1 text-[10px] font-bold rounded-full">
                {profile.goal}
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mt-1.5 flex items-center gap-1">
              <span>{profile.joinYear}년부터 프리미엄 회원</span>
            </p>
          </div>
          <button
            onClick={() => {
              setEditedName(profile.name);
              setEditedWeight(profile.weight);
              setEditedHeight(profile.height);
              setEditedGoal(profile.goal);
              setShowEditModal(true);
            }}
            className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </section>

        {/* Physical Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-[#1c1c1e] rounded-[20px] p-4 text-center flex flex-col justify-between border border-white/[0.02] aspect-square">
            <span className="material-symbols-outlined text-[#adc6ff] text-xl">height</span>
            <p className="text-md font-bold text-white tracking-tight mt-1">
              {profile.height}
              <span className="text-xs text-[#8e8e93] font-normal ml-0.5">cm</span>
            </p>
            <span className="text-[10px] text-[#8e8e93] font-semibold">키</span>
          </div>
          <div className="bg-[#1c1c1e] rounded-[20px] p-4 text-center flex flex-col justify-between border border-white/[0.02] aspect-square">
            <span className="material-symbols-outlined text-[#4edea3] text-xl">fitness_center</span>
            <p className="text-md font-bold text-white tracking-tight mt-1">
              {profile.weight}
              <span className="text-xs text-[#8e8e93] font-normal ml-0.5">kg</span>
            </p>
            <span className="text-[10px] text-[#8e8e93] font-semibold">몸무게</span>
          </div>
          <div className="bg-[#1c1c1e] rounded-[20px] p-4 text-center flex flex-col justify-between border border-white/[0.02] aspect-square">
            <span className="material-symbols-outlined text-[#d0bcff] text-xl">cake</span>
            <p className="text-md font-bold text-white tracking-tight mt-1">
              {profile.age}
              <span className="text-xs text-[#8e8e93] font-normal ml-0.5">세</span>
            </p>
            <span className="text-[10px] text-[#8e8e93] font-semibold">나이</span>
          </div>
        </section>

        {/* Account Settings Menu */}
        <section className="space-y-2.5">
          <h3 className="text-[11px] text-[#8e8e93] font-semibold uppercase tracking-wider px-1">계정 설정</h3>
          <div className="space-y-2">
            {[
              { label: "개인 정보 관리", icon: "person", active: true },
              { label: "맞춤 건강 목표", icon: "track_changes", active: false },
              { label: "푸시 알림 설정", icon: "notifications", active: false },
              { label: "블루투스 기기 연동", icon: "devices", active: false },
            ].map((menu) => (
              <div
                key={menu.label}
                className="bg-[#1c1c1e] p-4 rounded-[20px] flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors border border-white/[0.02]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#8e8e93] group-hover:text-white transition-colors text-lg">
                      {menu.icon}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">{menu.label}</span>
                </div>
                <span className="material-symbols-outlined text-[#8e8e93] group-hover:text-white transition-colors text-md">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Export Health Report Button */}
        <section className="pt-2 pb-8 space-y-3">
          <button
            onClick={handleExportReport}
            className="w-full py-4 bg-[#adc6ff]/10 hover:bg-[#adc6ff]/15 border border-[#adc6ff]/25 text-[#adc6ff] rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#adc6ff] text-xl">analytics</span>
            건강 보고서 내보내기 (PDF)
          </button>
          <p className="text-center text-xs text-[#8e8e93] leading-relaxed px-3">
            의료진 상담 및 본인 확인 시 제출 가능한 정밀 주간 주요 건강 활동 기록 지표 분석표를 생성합니다.
          </p>
        </section>
      </main>

      {/* Floating Export Toast */}
      {showReportToast && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 bg-[#adc6ff] text-[#121212] text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl z-50 animate-bounce">
          건강 보고서 PDF를 생성 및 내보냈습니다!
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="absolute inset-0 z-50 bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/[0.04] rounded-[24px] w-full max-w-sm p-6 space-y-4 shadow-2xl text-left">
            <h3 className="text-md font-bold text-white">프로필 수정</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                  이름
                </label>
                <input
                  type="text"
                  required
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                    키 (cm)
                  </label>
                  <input
                    type="number"
                    required
                    value={editedHeight}
                    onChange={(e) => setEditedHeight(Number(e.target.value))}
                    className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                    몸무게 (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editedWeight}
                    onChange={(e) => setEditedWeight(Number(e.target.value))}
                    className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#8e8e93] mb-1.5 font-semibold">
                  현재 목표
                </label>
                <select
                  value={editedGoal}
                  onChange={(e) => setEditedGoal(e.target.value)}
                  className="w-full bg-[#202022] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#adc6ff] appearance-none"
                >
                  <option value="근비대">근비대</option>
                  <option value="체지방 감량">체지방 감량</option>
                  <option value="체력 유지">체력 유지</option>
                  <option value="심폐기능 향상">심폐기능 향상</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-[#202022] hover:bg-white/5 rounded-xl text-xs text-white font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#adc6ff] text-[#121212] rounded-xl text-xs font-bold shadow-lg shadow-[#adc6ff]/10"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 left-0 w-full z-45 flex justify-around items-center h-16 bg-[#121212]/95 backdrop-blur-md border-t border-white/[0.04]">
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 focus:outline-none cursor-pointer"
          onClick={() => navigate(ScreenType.DASHBOARD, "none")}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] mt-1 font-medium">홈</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 focus:outline-none cursor-pointer"
          onClick={() => navigate(ScreenType.ACTIVITY_TRACKING, "none")}
        >
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="text-[10px] mt-1 font-medium">활동</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-[#8e8e93] hover:text-white transition-all duration-150 active:scale-95 focus:outline-none cursor-pointer"
          onClick={() => navigate(ScreenType.SLEEP_ANALYSIS, "none")}
        >
          <span className="material-symbols-outlined">bedtime</span>
          <span className="text-[10px] mt-1 font-medium">수면</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-white font-bold transition-all duration-150 active:scale-95 focus:outline-none cursor-pointer"
          onClick={() => navigate(ScreenType.USER_PROFILE, "none")}
        >
          <span className="material-symbols-outlined text-[#adc6ff]">person</span>
          <span className="text-[10px] mt-1 font-semibold text-[#adc6ff]">프로필</span>
        </button>
      </nav>
    </div>
  );
}
