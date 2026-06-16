export enum ScreenType {
  DASHBOARD = "DASHBOARD",
  ACTIVITY_TRACKING = "ACTIVITY_TRACKING",
  USER_PROFILE = "USER_PROFILE",
  SLEEP_ANALYSIS = "SLEEP_ANALYSIS",
  DATA_ARCHIVE = "DATA_ARCHIVE",
}

export interface ActivityRecord {
  id: string;
  type: string;
  icon: string;
  title: string;
  time: string;
  duration: string;
  metric: string;
  colorClass: string;
  iconColorClass: string;
}

export interface ArchiveRecord {
  id: string;
  date: string;
  title: string;
  steps: number;
  sleepHours: string;
  calories: number;
  badge: "verified" | "insights" | "none";
  colorClass: string;
}

export interface UserProfileData {
  name: string;
  avatarUrl: string;
  joinYear: number;
  goal: string;
  height: number;
  weight: number;
  age: number;
}
