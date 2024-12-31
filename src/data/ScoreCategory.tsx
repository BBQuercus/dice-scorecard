export interface ScoreCategory {
  name: string;
  description: string;
  isCheckbox?: boolean;
  stepValue?: number;
  maxValue?: number;
  value?: number;
  example?: React.ReactNode;
}
