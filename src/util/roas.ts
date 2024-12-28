export const calculateROAS = (
  conversionValue: number,
  spend: number
): number => {
  if (spend === 0 || !conversionValue || !spend) return 0;
  const roas = (conversionValue / spend) * 100;
  return Number.isFinite(roas) ? roas : 0;
};

export const formatROAS = (roas: number | null | undefined): string => {
  if (!roas || !Number.isFinite(roas)) return "0.00%";
  return `${Number(roas).toFixed(2)}%`;
};
