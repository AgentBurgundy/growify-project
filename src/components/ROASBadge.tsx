import { formatROAS } from "@/util/roas";

interface ROASBadgeProps {
  roas: number | null | undefined;
}

export default function ROASBadge({ roas }: ROASBadgeProps) {
  const formattedROAS = formatROAS(roas);
  const roasValue = roas || 0;

  return (
    <div className="bg-green-200 text-black px-2 py-1 w-40 text-center rounded-md">
      <span>ROAS - </span>
      <span className="font-bold">{formattedROAS}</span>
    </div>
  );
}
