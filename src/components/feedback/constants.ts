
// List of qualities to rate in the feedback form
export const qualities = [
  "Outstanding Performance",
  "Clear Purpose & Usefulness",
  "Intuitive User Experience (UX)",
  "Polished User Interface (UI)",
  "Stability and Reliability",
  "Security and Privacy",
  "Regular Updates and Maintenance",
  "Cross-Platform Consistency",
  "Excellent Customer Support",
  "Accessibility"
];

// Define interfaces for our data types
export interface Rating {
  id?: string;
  userId: string;
  qualityId: number;
  score: number;
  createdAt: string;
}
