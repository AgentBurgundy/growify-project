export interface Creative {
  id: string;
  name: string;
  type: string;
  url: string;
  text: string;
  thumbnail: string;
}

export interface Insights {
  entityCounter: number;
  spend: number;
  conversionValue: number;
  conversions: number;
  impressions: number;
  clicks: number;
  videoPlay3s: number;
}

export interface Target {
  accountId: string;
  accountName: string;
  serviceId: any;
  serviceType: string;
}

export interface InsightItem {
  creative: Creative;
  insights: Insights;
  target: Target;
}

export type BreakdownType = "TEXT" | "IMAGE";

export interface InsightsResponse {
  data: InsightItem[];
}
