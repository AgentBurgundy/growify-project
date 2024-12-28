export const calculateCPA = (spend: number, conversions: number): number => {
  if (conversions === 0 || !conversions || !spend) return 0;
  const cpa = spend / conversions;
  return Number.isFinite(cpa) ? cpa : 0;
};

export const formatCPA = (cpa: number | null | undefined): string => {
  if (!cpa || !Number.isFinite(cpa)) return "$0.00";
  return `$${Number(cpa).toFixed(2)}`;
};
