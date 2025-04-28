
export interface ProgressData {
  name: string; // Day name (e.g., 'Mon', 'Tue')
  date: string; // ISO date string
  minutes: number;
}

export interface ProgressUpdateFunction {
  (date: string, minutes: number): void;
}
