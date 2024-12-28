import { formatCPA } from "@/util/cpa";

interface CPABadgeProps {
  cpa: number;
}

export default function CPABadge({ cpa }: CPABadgeProps) {
  return (
    <div className="bg-yellow-200 text-black px-2 py-1 rounded-md w-40 text-center">
      <span>CPA - </span>
      <span className="font-bold">{formatCPA(cpa)}</span>
    </div>
  );
}
