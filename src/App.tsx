import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScreenType, UserProfileData } from "./types";
import Dashboard from "./components/Dashboard";
import ActivityTracking from "./components/ActivityTracking";
import UserProfile from "./components/UserProfile";
import SleepAnalysis from "./components/SleepAnalysis";
import DataArchive from "./components/DataArchive";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.DASHBOARD);
  const [transitionType, setTransitionType] = useState<"none" | "push">("none");

  // State shared across screens for high protocol completeness
  const [currentSteps, setCurrentSteps] = useState(8432);
  const [profile, setProfile] = useState<UserProfileData>({
    name: "김동찬",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYaNfpASLxbGno8gh4QVvFLBUdFdPPrOwq94BUYQTeoZvNQeQc4Ky2dAmFUhQ4ouIYuUD0T1j6r03NmY-P2Uix2aPu9q1KZ-_cHhl_6MIbTIeO1H8L6UWQNMFmEN1kE6FU8SIsvN0c7ectU9ABVlJ5dWHyK22i2eQnTXUGKWWz1Ocp8T28G_ikzOttB1aFYIQcu-0J5RRdhHBpSjfHvkIL4Bd9_S0Syb2dDKO1gW1q9qI7B6HTDSiSpIyvFnIHtxkXUL7C5FbTqaa",
    joinYear: 2023,
    goal: "근비대",
    height: 182,
    weight: 78.5,
    age: 28,
  });

  const handleNavigate = (screen: ScreenType, transition: "none" | "push") => {
    setTransitionType(transition);
    setCurrentScreen(screen);
  };

  const incrementSteps = (amount: number) => {
    setCurrentSteps((prev) => prev + amount);
  };

  const updateProfile = (data: Partial<UserProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  // Define transition variations of motion
  const variants = {
    initial: (custom: "none" | "push") => {
      if (custom === "none") return { x: 0, opacity: 1 };
      return { x: "100%", opacity: 0.9 };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (custom: "none" | "push") => {
      if (custom === "none") return { x: 0, opacity: 1 };
      return { x: "-30%", opacity: 0.5 };
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.DASHBOARD:
        return (
          <Dashboard navigate={handleNavigate} currentSteps={currentSteps} />
        );
      case ScreenType.ACTIVITY_TRACKING:
        return (
          <ActivityTracking
            navigate={handleNavigate}
            currentSteps={currentSteps}
            incrementSteps={incrementSteps}
          />
        );
      case ScreenType.USER_PROFILE:
        return (
          <UserProfile
            navigate={handleNavigate}
            profile={profile}
            updateProfile={updateProfile}
          />
        );
      case ScreenType.SLEEP_ANALYSIS:
        return <SleepAnalysis navigate={handleNavigate} />;
      case ScreenType.DATA_ARCHIVE:
        return (
          <DataArchive navigate={handleNavigate} currentSteps={currentSteps} />
        );
      default:
        return (
          <Dashboard navigate={handleNavigate} currentSteps={currentSteps} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex justify-center items-stretch font-sans">
      <div className="w-full max-w-[440px] bg-[#121212] flex flex-col relative overflow-hidden shadow-2xl border-x border-[#1c1c1e] text-[#e5e2e1] antialiased">
        <AnimatePresence mode="wait" custom={transitionType}>
          <motion.div
            key={currentScreen}
            custom={transitionType}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 flex flex-col overflow-y-auto"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
